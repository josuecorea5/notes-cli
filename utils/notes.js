import fs from "node:fs/promises";
import chalk from "chalk";

const loadNotes = async () => {
  try {
    const dataBuffer = await fs.readFile("notes.json", "utf-8");
    return JSON.parse(dataBuffer);
  } catch (error) {
    return [];
  }
};

const saveNotes = async (notes) => {
  const data = JSON.stringify(notes, null, 2);
  await fs.writeFile("notes.json", data);
};

const addNote = async (title, body) => {
  const notes = await loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({ title, body });
    await saveNotes(notes);
    console.log(chalk.hex("#7BC9FF").inverse("Nota agredada!\n"));
  } else {
    console.log(chalk.red.inverse("Note no agregada"));
  }
};

const removeNote = async (title) => {
  const notes = await loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    await saveNotes(notesToKeep);
    console.log(chalk.hex("#7BC9FF").inverse("Nota eliminada!\n"));
  } else {
    console.log(chalk.red.inverse("Nota no eliminada!\n"));
  }
};

const listNotes = async () => {
  const notes = await loadNotes();
  console.log(chalk.hex("#7BC9FF").inverse("--------Tus notas!--------\n"));

  notes.forEach((note) => {
    console.log(note.title);
    console.log(`${note.body}\n`);
  });
};

const findNote = async (title) => {
  const notes = await loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.hex("#7BC9FF")(note.title));
    console.log(`${chalk.hex("#7BC9FF")(note.body)}\n`);
  } else {
    console.log(chalk.red.inverse("Nota no encontrada!"));
  }
};

const editNote = async (title, newTitle, newBody) => {
  const notes = await loadNotes();
  const existTitle = notes.find((note) => note.title === newTitle);
  const note = notes.find((note) => note.title === title);
  const noteIndex = notes.indexOf(note);

  if (!existTitle) {
    notes[noteIndex] = { title: newTitle, body: newBody };
    await saveNotes(notes);
    console.log(chalk.hex("#7BC9FF").inverse("Nota editada!\n"));
  } else {
    console.log(chalk.red.inverse("Nota no editada, el titulo ya existe!"));
  }
};

export { addNote, removeNote, listNotes, findNote, editNote };
