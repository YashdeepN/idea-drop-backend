import { SignJWT } from "jose";
import { JWT_SECRET } from "./getJWTSecret.js";

/**
 * Generate a JWT
 * @param {Oject} payload     - Data to embe in the token.
 * @param {string} expiresIn   - Expiration time (e.g. 15m, 7d etc)
 */

export const generateToken = async (payload, expiresIn = "15m") => {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
};
