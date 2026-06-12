// Generates the ECDSA P-256 keypair for the server activation gate.
//
//   node scripts/gen-activation-keys.mjs
//
// ECDSA P-256 / SHA-256 is verifiable by .NET's built-in System.Security.
// Cryptography.ECDsa with no extra dependency. Nothing secret is written to
// the repo. Set ACTIVATION_SIGN_SK as a Vercel environment variable. Embed
// ACTIVATION_SIGN_PK into the server's OnlineActivation verifier. Re-running
// rotates the keypair (update both the env var and the embedded key, rebuild).
import { generateKeyPairSync } from "node:crypto";

const { publicKey, privateKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
const sk = privateKey.export({ type: "pkcs8", format: "der" }); // private key, PKCS#8 DER
const pk = publicKey.export({ type: "spki", format: "der" }); // public key, SPKI DER

console.log("Vercel env var (SECRET — do not commit):");
console.log("  ACTIVATION_SIGN_SK =", Buffer.from(sk).toString("base64"));
console.log("");
console.log("Embed in server (public — safe to ship inside the binary):");
console.log("  ACTIVATION_SIGN_PK =", Buffer.from(pk).toString("base64"));
