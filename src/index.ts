import { ENDPOINT, INITIAL_TOKEN, USER_AGENT } from "./conts";
import { Session, ClientIdentifier, initTLS } from "node-tls-client";
import { AuthenticationResponseDtoModel, Circle, GetCirclesResponse, GetMembersListResponseModel, GetPlacesResponseModel, Member, Place } from "./models";

interface JsL360Props {
    username: string;
    password: string;
    token?: string;
}

/**
 * JsL360 is a class that provides methods to interact with the Life360 API.
 * It allows authentication, fetching circles, members, places, and more.
 * The class uses TLS fingerprinting to ensure secure communication with the API.
 */
class JsL360 {
    props: JsL360Props;
    tls_session!: Session;
    get token() {
        return this.props.token || INITIAL_TOKEN;
    }

    /**
     * Constructor for JsL360
     * @param props - Constructor properties
     */
    constructor(props: JsL360Props) {
        this.props = props;
    }

    /**
     * Initializes the TLS session for Life360 API.
     * This is needed because they are TLS fingerprinting
     */
    private async init_tls() {
        await initTLS();
        this.tls_session = new Session({
            clientIdentifier: ClientIdentifier.okhttp4_android_13,
            timeout: 3000,
            randomTlsExtensionOrder: true,
        });
    }

    /**
     * Get the headers for the Life360 API requests.
     * @returns {Object} - Headers object containing User-Agent, Accept, and Authorization.
     */
    private __getHeaders(): Record<string, string> {
        return {
            "User-Agent": "com.life360.android.safetymapd/KOKO/24.50.0 android/13",
            "Accept": "application/json",
            "Authorization": this.token
        }
    }

    /**
     * Authenticates the user with Life360 API using username and password.
     * Uses the default token if not authenticated.
     */
    async AuthenticateAsync() {
        await this.init_tls()
        const result = await this.tls_session.post(`${ENDPOINT}/v3/oauth2/token`, {
            body: new URLSearchParams({
                username: this.props.username,
                password: this.props.password,
                grant_type: "password",
            }).toString(),
            headers: {
                ...this.__getHeaders(),
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        const response_body = await result.json() as AuthenticationResponseDtoModel;
        this.props.token = `Bearer ${response_body.access_token}`;
    }

    /**
     * Fetches the circles associated with the authenticated user.
     * This method retrieves all circles the user is a member of.
     * @returns {Promise<GetCirclesResponse>} - A promise that resolves to the circles response.
     */
    async GetCirclesAsync(): Promise<GetCirclesResponse> {
        const result = await this.tls_session.get(`${ENDPOINT}/v3/circles`, {
            headers: this.__getHeaders()
        })

        if (!result.ok) throw new Error(`Failed to fetch circles: ${result.status}`);
        return await result.json() as GetCirclesResponse;
    }

    /**
     * Fetches details of a specific circle by its ID.
     * This method retrieves detailed information about a circle, including its members and features.
     * @param circleId - The ID of the circle to fetch.
     * @returns {Promise<Circle>} - A promise that resolves to the circle details.
     */
    async GetCircleAsync(circleId: string): Promise<Circle> {
        const result = await this.tls_session.get(`${ENDPOINT}/v3/circles/${circleId}`, {
            headers: this.__getHeaders()
        })
        if (!result.ok) throw new Error(`Failed to fetch circle: ${result.status}`);
        return await result.json() as Circle;
    }

    /**
     * Fetches places associated with a specific circle.
     * This method retrieves all places that are part of a circle, such as home, work, or other locations.
     * @param circleId - The ID of the circle for which to fetch places.
     * @returns {Promise<GetPlacesResponseModel>} - A promise that resolves to the places response.
     */
    async GetPlacesAsync(circleId: string): Promise<GetPlacesResponseModel> {
        const result = await this.tls_session.get(`${ENDPOINT}/v3/circles/${circleId}/places`, {
            headers: this.__getHeaders()
        })

        if (!result.ok) throw new Error(`Failed to fetch places: ${result.status}`);
        return await result.json() as GetPlacesResponseModel;
    }

    /**
     * Fetches a specific place by its ID within a circle.
     * This method retrieves detailed information about a specific place, such as its location and type.
     * @param circleId - The ID of the circle containing the place.
     * @param placeId - The ID of the place to fetch.
     * @returns {Promise<Place>} - A promise that resolves to the place details.
     */
    async GetPlaceAsync(circleId: string, placeId: string): Promise<Place> {
        const result = await this.tls_session.get(`${ENDPOINT}/v3/circles/${circleId}/places/${placeId}`, {
            headers: this.__getHeaders()
        })

        if (!result.ok) throw new Error(`Failed to fetch place: ${result.status}`);
        return await result.json();
    }

    /**
     * Fetches the members of a specific circle.
     * This method retrieves all members associated with a circle, including their details and features.
     * @param circleId - The ID of the circle for which to fetch members.
     * @returns {Promise<GetMembersListResponseModel>} - A promise that resolves to the members response.
     */
    async GetMembersAsync(circleId: string): Promise<GetMembersListResponseModel> {
        const result = await this.tls_session.get(`${ENDPOINT}/v3/circles/${circleId}/members`, {
            headers: this.__getHeaders()
        })

        if (!result.ok) throw new Error(`Failed to fetch members: ${result.status}`);
        return await result.json() as GetMembersListResponseModel;
    }

    /**
     * Fetches a specific member's details within a circle.
     * This method retrieves detailed information about a member, including their features, issues, and communication
     * @param circleId - The ID of the circle containing the member.
     * @param memberId - The ID of the member to fetch.
     * @returns {Promise<Member>} - A promise that resolves to the member details.
     */
    async GetMemberAsync(circleId: string, memberId: string): Promise<Member> {
        const result = await this.tls_session.get(`${ENDPOINT}/v3/circles/${circleId}/members/${memberId}`, {
            headers: this.__getHeaders()
        })

        if (!result.ok) throw new Error(`Failed to fetch member: ${result.status}`);
        return await result.json() as Member;
    }

    /**
     * Forces an update of a member's location in a circle.
     * This method sends a request to update the member's location, which can be useful if the location is not updating automatically.
     * @param circleId - The ID of the circle containing the member.
     * @param memberId - The ID of the member whose location should be updated.
     */
    async ForceMemberUpdate(circleId: string, memberId: string): Promise<boolean> {
        const result = await this.tls_session.post(`${ENDPOINT}/v3/circles/${circleId}/members/${memberId}/request`, {
            body: new URLSearchParams({
                type: "location"
            }).toString(),
            headers: {
                ...this.__getHeaders(),
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        return result.ok
    }
}

export default JsL360;