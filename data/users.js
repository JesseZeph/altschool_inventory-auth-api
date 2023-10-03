const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "users.json");

const loadUsersFromFile = () => {
  try {
    const fileContents = fs.readFileSync(usersPath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
};

const saveUsersToFile = (users) => {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf8");
};

const findUserByUsername = (username) => {
  const users = loadUsersFromFile();
  return users.find((user) => user.username === username);
};

const createUser = (username, password, role) => {
  const users = loadUsersFromFile();
  const newUser = { username, password, role, apiKey: generateApiKey() };
  users.push(newUser);
  saveUsersToFile(users);
  return newUser;
};

const findUserByApiKey = (apiKey) => {
  const users = loadUsersFromFile();
  return users.find((user) => user.apiKey === apiKey);
};

module.exports = { createUser, findUserByUsername, findUserByApiKey };
