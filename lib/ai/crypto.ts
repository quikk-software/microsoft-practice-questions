import "server-only";
import crypto from "crypto";

// Verschlüsselung der User-API-Keys at rest (AES-256-GCM).
// Schlüsselableitung aus ENV AI_KEY_ENCRYPTION_SECRET (beliebiger langer String).
// Format: base64( iv[12] | authTag[16] | ciphertext )

function encryptionKey(): Buffer {
  const secret = process.env.AI_KEY_ENCRYPTION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "AI_KEY_ENCRYPTION_SECRET fehlt oder ist zu kurz (min. 16 Zeichen) — in .env.local setzen."
    );
  }
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptApiKey(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64");
}

export function decryptApiKey(encoded: string): string {
  const raw = Buffer.from(encoded, "base64");
  const iv = raw.subarray(0, 12);
  const tag = raw.subarray(12, 28);
  const data = raw.subarray(28);
  const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}

/** UI-Hinweis, ohne den Key zu verraten: "sk-…abcd" */
export function keyHint(plain: string): string {
  const tail = plain.slice(-4);
  const head = plain.slice(0, Math.min(3, plain.length));
  return `${head}…${tail}`;
}
