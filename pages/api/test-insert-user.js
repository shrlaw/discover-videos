// pages/api/test-insert-user.js
import { magicAdmin } from "../../lib/magic";

const HASURA_ADMIN_URL = process.env.NEXT_PUBLIC_HASURA_ADMIN_URL;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET; // make sure you have this

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const auth = req.headers.authorization || "";
    const didToken = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!didToken) return res.status(401).json({ error: "No DID token provided" });

    const metadata = await magicAdmin.users.getMetadataByToken(didToken);

    const insertQuery = `
      mutation insertUser($issuer: String!, $email: String!, $publicAddress: String!) {
        insert_users_one(object: {issuer: $issuer, email: $email, publicAddress: $publicAddress}) {
          id
          issuer
          email
          publicAddress
        }
      }
    `;

    const variables = {
      issuer: metadata.issuer,
      email: metadata.email,
      publicAddress: metadata.publicAddress,
    };

    const response = await fetch(HASURA_ADMIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
        query: insertQuery,
        variables,
      }),
    });

    const data = await response.json();

    return res.status(200).json({ ok: true, data });
  } catch (err) {
    console.error("insert user failed:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
