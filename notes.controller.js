const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(__dirname, "db.json");

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await saveNotes(notes);
}

async function deleteNotes(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((note) => note.id !== String(id));
  await saveNotes(newNotes);
  console.log("note delete");
}

async function printNotes() {
  const notes = await getNotes();

  notes.forEach((note) => {
    console.log(note.title);
  });
}

async function editNotes(data) {
  const notes = await getNotes();
  notes.forEach((note) => {
    if (note.id === data.body.id) {
      note.title = data.body.title;
    }
  });
  await saveNotes(notes);
}

module.exports = {
  addNote,
  printNotes,
  getNotes,
  deleteNotes,
  editNotes,
};
