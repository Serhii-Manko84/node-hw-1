// const { readFile, writeFile } = require("./contacts"); //-Крок 3 Зроби імпорт модуля contacts.js в файлі index.js
// та перевір працездатність функції для роботи з контактами.-//
const { Command } = require("Commander");

const contacts = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n --name <type>", "user name")
  .option("-e --email <type>", "user email")
  .option("-p --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const contactID = await contacts.getContactById(id);
      console.log(contactID);
      break;
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case "remove":
      const removeContact = await contacts.removeContactById(id);
      console.log(removeContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

// invokeAction({ action: "List" });
// invokeAction({ action: "get", id: "5" });
// invokeAction({
//   action: "add",
//   name: "Mango",
//   email: "mango@gmail.com",
//   phone: "322-22-22",
// });
// invokeAction({ action: "remove", id: "v1YBggX9OV8_Wl5GOYbNy" });