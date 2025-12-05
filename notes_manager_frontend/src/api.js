const getBaseUrl = () => {
  // PUBLIC_INTERFACE
  // Derive base URL from env with sane defaults.
  const envUrl =
    process.env.REACT_APP_BACKEND_URL ||
    process.env.REACT_APP_API_BASE ||
    "http://localhost:3001";
  return envUrl.replace(/\/+$/, "");
};

const BASE = getBaseUrl();

// Helper to handle JSON and errors
async function request(path, opts = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    let message = `Request failed with ${res.status}`;
    try {
      const data = await res.json();
      message = data.detail || JSON.stringify(data);
    } catch (e) {
      // ignore parse error
    }
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

// PUBLIC_INTERFACE
export const NotesAPI = {
  /** Fetch all notes */
  list: () => request("/api/notes/"),
  /** Create a note */
  create: (payload) =>
    request("/api/notes/", { method: "POST", body: JSON.stringify(payload) }),
  /** Update a note by id (PUT) */
  update: (id, payload) =>
    request(`/api/notes/${id}/`, { method: "PUT", body: JSON.stringify(payload) }),
  /** Patch a note by id (PATCH) */
  patch: (id, payload) =>
    request(`/api/notes/${id}/`, { method: "PATCH", body: JSON.stringify(payload) }),
  /** Delete a note by id */
  remove: (id) => request(`/api/notes/${id}/`, { method: "DELETE" }),
};
