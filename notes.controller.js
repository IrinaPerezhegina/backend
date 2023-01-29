const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}
async function removeNote(id) {
  const notes = await getNotes();
  const removeElementIndex = notes.findIndex((el) => el.id === id.toString());
  if (removeElementIndex !== -1) {
    notes.splice(removeElementIndex, 1);
    console.log(chalk.red(`Remove note by id=${id}`));
  } else {
    console.log(
      chalk.green(`
    Note with this id=${id} is missing`)
    );
  }
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function editNote(id, title) {
  const notes = await getNotes();
  const removeElementIndex = notes.findIndex((el) => el.id === id.toString());
  notes[removeElementIndex].title = title;
  console.log(title);
  console.log(chalk.red(`Edit note by id=${id}`));
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote,
};
