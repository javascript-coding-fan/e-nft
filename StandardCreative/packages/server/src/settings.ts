import dotenv from 'dotenv';

dotenv.config();

export const jwtEncryption = process.env.JWT_ENCRYPTION;
export const jwtExpiration = process.env.JWT_EXPIRATION;

export const refreshEncryption = process.env.REFRESH_ENCRYPTION;
export const refreshExpiration = process.env.REFRESH_EXPIRATION;

export const rsaPrivateKey = process.env.RSA_PRIVATE_KEY;
export const rsaPublicKey = process.env.RSA_PUBLIC_KEY;

export const instagramAppId = process.env.INSTAGRAM_APP_ID;
export const instagramAppSecret = process.env.INSTAGRAM_APP_SECRET;
export const rapidApiKey = process.env.RAPID_API_KEY;
export const rapidApiHost = process.env.RAPID_API_HOST;
export const infuraProvider = process.env.INFURA_PROVIDER;
export const auctionAddress = process.env.AUCTION_ADDRESS;
export const adminAddress = process.env.ADMIN_ADDRESS;
export const adminPrivKey = process.env.ADMIN_PRIV_KEY;

export const cacheExpire = process.env.CACHE_EXPIRE ? process.env.CACHE_EXPIRE : 7200;
export const tokenExpire = process.env.TOKEN_EXPIRE ? process.env.TOKEN_EXPIRE : 60*24*31;

let webHostURL = process.env.WEB_HOST_URL;
export const webURL = webHostURL;
