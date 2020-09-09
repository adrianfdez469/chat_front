const DEV = {
    server: "http://localhost:3001"
}
const PROD = {
    // eslint-disable-next-line no-restricted-globals
    //server: location.origin //"https://shut-app-back.herokuapp.com"
    server: "https://shut-app-back.herokuapp.com"
}

export const DEFAULT_CONFIG = process.env.NODE_ENV === "development" ? DEV : PROD;