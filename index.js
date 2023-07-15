require('dotenv').config(); // Load environment variables from .env file

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  }
});

// Function to drop all tables
const dropTables = async () => {
    try {
      await knex.schema.dropTableIfExists('user_course');
      await knex.schema.dropTableIfExists('course');
      await knex.schema.dropTableIfExists('user');
      console.log('Tables dropped successfully!');
    } catch (error) {
      console.error('Failed to drop tables:', error);
    }
  };


  // Function to create 'user' table
const createUserTable = async () => {
    // ... your existing code for creating 'user' table
    // Rest of the migration code remains the same
// Create 'user' table migration
await knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('full_name').notNullable();
    table.string('phone_number').notNullable();
    table.string('password').notNullable();
    table.timestamp('created_date').defaultTo(knex.fn.now());
    table.timestamp('modified_date').defaultTo(knex.fn.now());
    table.string('created_by');
    table.string('modified_by');
    table.string('lock_verify');
  }).then(() => {
    console.log("'user' table has been created successfully!");
  }).catch((error) => {
    console.error("Failed to create 'user' table:", error);
  })
  };



  // Function to create 'course' table
const createCourseTable = async () => {
    // ... your existing code for creating 'course' table
    // Create 'course' table migration
  await knex.schema.createTable('course', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('author').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.timestamp('created_date').defaultTo(knex.fn.now());
    table.timestamp('modified_date').defaultTo(knex.fn.now());
    table.string('created_by');
    table.string('modified_by');
    table.string('lock_verify');
  }).then(() => {
    console.log("'course' table has been created successfully!");
  }).catch((error) => {
    console.error("Failed to create 'course' table:", error);
  })
  };
  
  // Function to create 'user_course' table
  const createUserCourseTable = async () => {
    // ... your existing code for creating 'user_course' table
     // Create 'user_course' table migration
  await knex.schema.createTable('user_course', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('course_id').unsigned().notNullable();
    table.timestamp('buy_date').defaultTo(knex.fn.now());
    table.decimal('buy_price', 10, 2).notNullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_date').defaultTo(knex.fn.now());
    table.timestamp('modified_date').defaultTo(knex.fn.now());
    table.string('created_by');
    table.string('modified_by');
    table.string('lock_verify');
    table.foreign('user_id').references('user.id');
    table.foreign('course_id').references('course.id');
  }).then(() => {
    console.log("'user_course' table has been created successfully!");
  }).catch((error) => {
    console.error("Failed to create 'user_course' table:", error);
  })
  };

  // Function to execute refresh migration
const refreshMigration = async () => {
    try {
      await dropTables(); // Drop all tables
      await createUserTable(); // Recreate 'user' table
      await createCourseTable(); // Recreate 'course' table
      await createUserCourseTable(); // Recreate 'user_course' table
      console.log('Refresh migration completed!');
    } catch (error) {
      console.error('Failed to execute refresh migration:', error);
    } finally {
      knex.destroy();
    }
  };
  
  // Call the refresh migration function
  refreshMigration();
  
  
  
 