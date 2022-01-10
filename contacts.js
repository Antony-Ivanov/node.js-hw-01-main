const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parseContacts = JSON.parse(contacts);
    // console.table(parseContacts);
    return parseContacts;
  } catch (error) {
    console.log('ERROR', error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if (!result) {
      console.log(`We have no contact with this id = ${contactId}!`);
      return null;
    }
    return result;
  } catch (error) {
    console.log('ERROR', error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
      console.log(`We have no contact with this id = ${contactId}!`);
      return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return contacts[idx];
  } catch (error) {
    console.log('ERROR', error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: v4(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log('ERROR', error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
