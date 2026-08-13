// NOTE: This memory store is no longer used in production routes.
// All data operations go directly to MongoDB.
// This file is kept as an empty stub to avoid breaking any legacy imports.
const memoryStore = {
  users: [],
  destinations: [],
  blogs: [],
  videos: [],
  gallery: [],
  messages: [],
};

module.exports = memoryStore;

