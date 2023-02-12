const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

//---------Рядки з 12 по 25 написані згідно КРОК 2...Додай функції для роботи з колекцією контактів.
// У функціях використовуй модуль fs та його методи readFile() і writeFile()
// Зроби експорт створених функцій через module.exports (але для чого вони були треба так і не зрозумів, якщо далі contacts.js
// описано що треба зробити в цьому файлі)------------//

// const readFile = fs
//   .readFile(contactsPath)
//   .then((data) => console.log(data.toString()))
//   .catch((error) => console.log(error.message));

// const writeFile = fs
//   .writeFile(contactsPath, data: "123456789")
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error.message));

// module.exports = {
//   readFile,
//   writeFile,
// };

// TODO: задокументувати кожну функцію

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContactById = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [deleteContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deleteContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContactById,
};
