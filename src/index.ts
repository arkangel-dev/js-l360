interface JsL360Props {
    __username: string;
    __password: string;
}

class JsL360 {
    props: JsL360Props;

    constructor(props: JsL360Props) {
        this.props = props;
    }

    PrintCredentials() {
        console.log({
            __username: this.props.__username,
            __password: this.props.__password
        })
    }
}

export default JsL360;