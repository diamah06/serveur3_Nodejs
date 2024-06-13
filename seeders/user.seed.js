const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');

async function seed() {

  const users = [
    {
      role: "client",
      first_name: "client1",
      last_name: "isClient",
      email: "client1@mail.com",
      phoneNumber: "000",
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Add more users as needed
  ];

  for (let user of users) {
    await User.create(user);
  }

  console.log('Database seeded!');
}

module.exports = seed;