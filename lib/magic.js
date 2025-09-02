// lib/magic.js
import { Magic } from "@magic-sdk/admin";

const magicAdmin = new Magic(process.env.MAGIC_SERVER_KEY); // Make sure this env var exists in Vercel
export default magicAdmin;


// import { Magic } from "@magic-sdk/admin";

// export const magicAdmin = new Magic(process.env.MAGIC_SERVER_KEY); // ✨