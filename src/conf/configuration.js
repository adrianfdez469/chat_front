const DEV = {
    server: "http://localhost:3001"
}
const PROD = {
    server: "https://shut-app-back.herokuapp.com"
}

export const DEFAULT_CONFIG = process.env.NODE_ENV === "development" ? DEV : PROD;