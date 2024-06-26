import sendRequest from "./send-request";
const BASE_URL = '/api/notes';

export async function getAll() {
  return sendRequest(`${BASE_URL}`);
}

export async function createNote(note) {
  return sendRequest(BASE_URL, 'POST', note);
}

export async function deleteNote(noteId) {
  try {
    return await sendRequest(`${BASE_URL}/${noteId}`, 'DELETE');
  } catch (err) {
    console.error('Error deleting note:', err);
    throw err;
  }
}

export async function editNote(noteId, noteData) {
  return sendRequest(`${BASE_URL}/${noteId}`, 'PUT', noteData);
}


