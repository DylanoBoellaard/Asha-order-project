import nano from 'nano';

const couchdb = nano(process.env.COUCHDB_URL);
const db = couchdb.use('users');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const docs = await db.list({ include_docs: true });
      res.status(200).json(docs.rows.map(row => row.doc));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
