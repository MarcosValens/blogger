require("./config/environment");
const mode: string = process.env.MODE ? process.env.MODE : "development";
const isProduction: boolean = mode === "production";
const clientUrl: string = isProduction ? process.env.PRODUCTION_URL : process.env.DEVELOPMENT_URL;
const whitelist: string = isProduction ? process.env.WHITELIST_PRODUCTION : process.env.WHITELIST_DEVELOPMENT;

export const get = {
    mode(): boolean {
        return isProduction;
    },
    clientUrl(): string {
        return clientUrl;
    },
    whitelist(separator?: string): Array<string> {
        return whitelist.split(separator || " ")
    }
}