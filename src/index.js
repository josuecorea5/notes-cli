import readline from "node:readline/promises";
import chalk from "chalk";
import {
  addNote,
  editNote,
  findNote,
  listNotes,
  removeNote,
} from "../utils/notes.js";
const log = console.log;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showMenu = async () => {
  log(chalk.bgHex("#8576FF").bold("----------Notes App----------\n"));
  log(chalk.bold.hex("#7BC9FF")("----------Opciones----------\n"));
  log(`${chalk.hex("#8576FF")("add.")} Agregar nota`);
  log(`${chalk.hex("#8576FF")("remove.")} Remover nota`);
  log(`${chalk.hex("#8576FF")("list.")} Listar nota`);
  log(`${chalk.hex("#8576FF")("find.")} Buscar nota`);
  log(`${chalk.hex("#8576FF")("edit.")} Editar nota`);
  log(`${chalk.hex("#8576FF")("exit.")}  Salir`);
  log(chalk.hex("#7BC9FF")("----------------------------\n"));
  const option = await rl.question("Select an option: ");
  switch (option) {
    case "add":
      const title = await rl.question("Digite el titulo de la nota: ");
      const body = await rl.question("Digite el cuerpo de la nota: ");
      await addNote(title, body);
      showMenu();
      break;

    case "list":
      await listNotes();
      showMenu();
      break;

    case "remove":
      const titleNote = await rl.question("Digite el titulo de la nota: ");
      await removeNote(titleNote);
      showMenu();
      break;

    case "find":
      const titleFind = await rl.question(
        "Digite el titulo de la nota a buscar: "
      );
      await findNote(titleFind);
      showMenu();
      break;

    case "edit":
      const titleId = await rl.question(
        "Digite el titulo de la nota a editar: "
      );
      const newTitle = await rl.question("Digite el nuevo titulo de la nota: ");
      const newBody = await rl.question("Digite el nuevo cuerpo de la nota: ");
      await editNote(titleId, newTitle, newBody);
      showMenu();
      break;

    case "exit":
      rl.close();
      break;
  }
};

showMenu();
