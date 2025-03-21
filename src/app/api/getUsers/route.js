import nano from "nano";

if (!process.env.COUCHDB_URL) {
  throw new Error("COUCHDB_URL is not set in environment variables!");
}

const couchdb = nano(process.env.COUCHDB_URL);
const db = couchdb.use("users");

export async function GET() {
  try {
    const users = await db.list({ include_docs: true });
    return Response.json(users.rows.map(row => row.doc));
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
