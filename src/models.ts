export interface AuthenticationResponseDtoModel {
  access_token: string;
  token_type: string;
}

export interface CircleSummary {
  id: string;
  name: string;
  createdAt: string;
}

export interface GetCirclesResponse {
  circles: CircleSummary[];
}

export interface MemberFeatures {
  device: string;
  smartphone: string;
  nonSmartphoneLocating: string;
  geofencing: string;
  shareLocation: string;
  shareOffTimestamp: string | null;
  disconnected: string;
  pendingInvite: string;
  mapDisplay: string;
}

export interface MemberIssues {
  disconnected: string;
  type: string | null;
  status: string | null;
  title: string | null;
  dialog: string | null;
  action: string | null;
  troubleshooting: string;
}

export interface Location {
  latitude: string;
  longitude: string;
  accuracy: string;
  startTimestamp: number;
  endTimestamp: string;
  since: number;
  timestamp: string;
  name: string | null;
  placeType: string | null;
  source: string | null;
  sourceId: string | null;
  address1: string;
  address2: string;
  shortAddress: string;
  inTransit: string;
  tripId: string | null;
  driveSDKStatus: string | null;
  battery: string;
  charge: string;
  wifiState: string;
  speed: number;
  isDriving: string;
  userActivity: string | null;
  algorithm: string | null;
}

export interface CommunicationChannels {
  channel: string;
  value: string;
  type: string | null;
}

export interface Member {
  features: MemberFeatures;
  issues: MemberIssues;
  location: Location | null;
  communications: CommunicationChannels[];
  medical: string | null;
  relation: string | null;
  createdAt: string;
  activity: string | null;
  id: string;
  firstName: string;
  lastName: string;
  isAdmin: string;
  avatar: string | null;
  pinNumber: string | null;
  loginEmail: string;
  loginPhone: string;
}

export interface CircleFeatures {
  ownerId: string | null;
  premium: string;
  locationUpdatesLeft: number;
  priceMonth: string;
  priceYear: string;
  skuId: string | null;
  skuTier: string | null;
}

export interface Circle {
  id: string;
  name: string;
  color: string;
  type: string;
  createdAt: string;
  memberCount: string;
  unreadMessages: string;
  unreadNotifications: string;
  features: CircleFeatures;
  members: Member[];
}

export interface Place {
  id: string;
  ownerId: string;
  circleId: string;
  name: string;
  latitude: string;
  longitude: string;
  radius: string;
  type: string | null;
  typeLabel: string | null;
}

export interface GetPlacesResponseModel {
  places: Place[];
}

export interface GetMembersListResponseModel {
  members: Member[];
}

export interface PollableRequest {
  requestId: string;
  isPollable: string;
}
