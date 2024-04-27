import sendRequest from "./send-request";
const BASE_URL = '/api/notes';

export async function getAll() {
  return sendRequest(`${BASE_URL}?populateUser=true`);
}

export async function createNote(note) {
  return sendRequest(BASE_URL, 'POST', note);
}


