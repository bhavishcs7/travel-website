import app, { connectToDatabase } from '../server/server.js';

export default async function handler(req, res) {
  await connectToDatabase();
  return app(req, res);
}
