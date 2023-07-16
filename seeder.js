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

// Function to generate sample data for 'user' table
const generateUser = async () => {
  const saltRounds = 10;
  const pepper = process.env.DB_PASSWORD_PEPPER; // Pepper value from .env file
  const password = await bcrypt.hash('password123' + pepper, saltRounds);

  return {
    email: faker.internet.email().toLowerCase(),
    full_name: faker.name.findName(),
    phone_number: faker.phone.phoneNumber(),
    password: password,
    created_date: knex.fn.now(),
    modified_date: knex.fn.now(),
    created_by: 'Seeder',
    modified_by: 'Seeder',
    lock_verify: 'ABC123'
  };
};

// Function to generate sample data for 'course' table
const generateCourse = () => {
  return {
    name: faker.random.word(),
    author: faker.name.findName(),
    price: faker.datatype.number({ min: 10, max: 100 }),
    created_date: knex.fn.now(),
    modified_date: knex.fn.now(),
    created_by: 'Seeder',
    modified_by: 'Seeder',
    lock_verify: 'ABC123'
  };
};

// Function to generate sample data for 'user_course' table
const generateUserCourse = (userId, courseId) => {
  return {
    user_id: userId,
    course_id: courseId,
    buy_date: knex.fn.now(),
    buy_price: faker.datatype.number({ min: 10, max: 100 }),
    is_active: true,
    created_date: knex.fn.now(),
    modified_date: knex.fn.now(),
    created_by: 'Seeder',
    modified_by: 'Seeder',
    lock_verify: 'ABC123'
  };
};


const seedDatabase = async () => {
  try {
    // Seed 'user' table
    const userCount = 10; // Number of user records to generate
    const userRecordsPromises = Array.from({ length: userCount }, generateUser);
    const userRecords = await Promise.all(userRecordsPromises);
    await knex('user').insert(userRecords);

    // Seed 'course' table
    const courseCount = 5; // Number of course records to generate
    const courseRecordsPromises = Array.from({ length: courseCount }, generateCourse);
    const courseRecords = await Promise.all(courseRecordsPromises);
    await knex('course').insert(courseRecords);

    // Seed 'user_course' table
    const userCourseCount = 20; // Number of user_course records to generate
    const userCourseRecordsPromises = Array.from({ length: userCourseCount }, () => {
      const userId = faker.datatype.number({ min: 1, max: userCount });
      const courseId = faker.datatype.number({ min: 1, max: courseCount });
      
      return generateUserCourse(userId, courseId);
    });
    const userCourseRecords = await Promise.all(userCourseRecordsPromises);
    await knex('user_course').insert(userCourseRecords);

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  } finally {
    knex.destroy();
  }
};

// Call the seeder function
seedDatabase();
