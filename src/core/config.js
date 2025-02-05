class Config {
    static appName = () => process.env.NEXT_PUBLIC_APP_NAME;
    static baseUrl = () => process.env.NEXT_PUBLIC_BASE_URL;
    static baseApiUrl = () => this.baseUrl() + "api/";
}

export default Config;