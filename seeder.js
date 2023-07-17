require('dotenv').config(); // Load environment variables from .env file
const bcrypt = require('bcrypt');

const faker = require('faker');


const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  }
});



const newSeedDatabase = async () => {
  try {

    const saltRounds = 10;
    const pepper = process.env.DB_PASSWORD_PEPPER; // Pepper value from .env file
    const password = await bcrypt.hash('password123' + pepper, saltRounds);
    // Seed 'user' table
    const userRecords = [
      {
        id: 1,
        email: "admin@courseapp.com",
        full_name: "John the Admin",
        phone_number: faker.phone.phoneNumber(),
        password: password,
        roles: "ROLE_ADMIN",
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      },
      {
        id: 2,
        email: "billy@courseapp.com",
        full_name: "Billy The User",
        phone_number: faker.phone.phoneNumber(),
        password: password,
        roles: "ROLE_USER",
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      },
      {
        id: 3,
        email: "budi@courseapp.com",
        full_name: "Budi The User",
        phone_number: faker.phone.phoneNumber(),
        password: password,
        roles: "ROLE_USER",
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      },

    ]
    await knex('user').insert(userRecords);

    const courseRecords = [
      {
        id: 1,
        name: "Data Engineer Untuk Guru",
        author: "Laode Napitulu",
        price: 90000,
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      },
      {
        id: 2,
        name: "Memahami Fullstack dalam Satu Jam",
        author: "Sam Toni",
        price: 120000,
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      },
      {
        id: 3,
        name: "Kreasi Aneka Masakan Ayam Bakar",
        author: "Chef Rosyida",
        price: 60000,
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      },
      {
        id: 4,
        name: "Menggambar Doodle dan Mewarnainya",
        author: "Mas Dimboy",
        price: 25000,
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      },
    ];
    await knex('course').insert(courseRecords);

    const userCourseRecords = [
      {
        user_id: 1,
        course_id: 1,
        buy_date: knex.fn.now(),
        buy_price: 90000,
        is_active: true,
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      },
      {
        user_id: 2,
        course_id: 1,
        buy_date: knex.fn.now(),
        buy_price: 90000,
        is_active: true,
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      },
      {
        user_id: 1,
        course_id: 2,
        buy_date: knex.fn.now(),
        buy_price: 0,
        is_active: true,
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      },
      {
        user_id: 2,
        course_id: 2,
        buy_date: knex.fn.now(),
        buy_price: 0,
        is_active: true,
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      },
      {
        user_id: 2,
        course_id: 3,
        buy_date: knex.fn.now(),
        buy_price: 0,
        is_active: true,
        created_date: knex.fn.now(),
        modified_date: knex.fn.now(),
        created_by: 'Seeder',
        modified_by: 'Seeder',
        lock_verify: 'ABC123'
      }
    ];
    await knex('user_course').insert(userCourseRecords);

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  } finally {
    knex.destroy();
  }
};


// Call the seeder function
newSeedDatabase();
