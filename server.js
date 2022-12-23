const app = require("./app");
// const {
//   listContacts,
//   getById,
//     addContact,
//     removeContact,
//     updateContact,
// } = require("./handlers/contactsHandlers");

// async function name(req, res) {
//   console.log("contacts list =>", await listContacts());
// }
// name();

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
