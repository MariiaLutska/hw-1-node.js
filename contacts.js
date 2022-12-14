const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

//  * Розкоментуйте і запиши значення
const contactsPath = path.resolve('./db/contacts.json');

fs.readFile(contactsPath, 'utf8')
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  return contactsList;
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const contactById = contactsList.find((item) => item.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const idx = contactsList.find((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contactsList.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return removeContact;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return newContact;
}

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contacts;
