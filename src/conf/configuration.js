const DEV = {
    server: "http://localhost:3001"
}
const PROD = {
    // eslint-disable-next-line no-restricted-globals
    //server: location.origin
    server: "https://shut-app-pro.herokuapp.com"
}

export const DEFAULT_CONFIG = process.env.NODE_ENV === "development" ? DEV : PROD;