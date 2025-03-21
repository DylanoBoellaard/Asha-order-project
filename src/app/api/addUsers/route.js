import nano from "nano";

const couchdb = nano(process.env.COUCHDB_URL);
const db = couchdb.use("users");

export async function POST(req) {
  try {
    // Parse JSON request body
    const body = await req.json();

    // Ensure all required fields exist and are filled in
    if (!body.name || !body.email || !body.phonenumber|| !body.address) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert the new user into CouchDB
    const newUser = await db.insert(body);

    // User submittion successful
    return Response.json({ message: "User added successfully", id: newUser.id }, { status: 201 });
  } catch (error) {
    // If new user submittion failed
    return Response.json({ error: error.message }, { status: 500 });
  }
}
