const yargs = require("yargs");
const {
  addNote,
  //   getNotes,
  printNotes,
  removeNote,
  editNote,
} = require("./notes.controller");

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  handler({ id }) {
    removeNote(id);
  },
});

yargs.command({
  command: "edit",
  describe: "Remove note by id",
  handler({ id, title }) {
    editNote(id, title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNotes();
  },
});

yargs.parse();
