import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command({
    command: "edit",
    describe: "edit a note",
    builder: {
      title: {
        describe: "Id de la nota",
        demandOption: true,
        type: "string",
      },
      newTitle: {
        describe: "Nuevo titulo de la nota",
        demandOption: true,
        type: "string",
      },
      newBody: {
        describe: "Nuevo cuerpo de la nota",
        demandOption: true,
        type: "string",
      },
    },
    async handler(argv) {
      await editNote(argv.title, argv.newTitle, argv.newBody);
    },
  })
  .command({
    command: "add",
    describe: "Agreaga una nueva nota",
    builder: {
      title: {
        describe: "Titulo de la nota",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Cuerpo de la nota",
        demandOption: true,
        type: "string",
      },
    },
    async handler(argv) {
      await addNote(argv.title, argv.body);
    },
  })
  .command({
    command: "remove",
    describe: "Elimina una nota",
    builder: {
      title: {
        describe: "Titulo de la nota",
        demandOption: true,
        type: "string",
      },
    },
    async handler(argv) {
      await removeNote(argv.title);
    },
  })
  .command({
    command: "find",
    describe: "Buscar una nota",
    builder: {
      title: {
        describe: "Titulo de la nota",
        demandOption: true,
        type: "string",
      },
    },
    async handler(argv) {
      await findNote(argv.title);
    },
  })
  .command({
    command: "list",
    describe: "Lista todas las notas",
    async handler() {
      await listNotes();
    },
  })
  .parse();
