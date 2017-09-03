exports.up = (knex, Promise) =>
  Promise.all([

    knex.schema.createTable('users', (table) => {
      table.increments('uid').primary();
      table.string('password');
      table.string('email').unique();
      table.string('display_name');
      table.string('first_name');
      table.string('last_name');
      table.string('provider');
      table.json('profile');
      table.boolean('admin').notNullable().defaultTo(false);
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('posts', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('body');
      table.integer('author_id')
         .references('uid')
         .inTable('users');
      table.dateTime('postDate');
    }),

    knex.schema.createTable('comments', (table) => {
      table.increments('id').primary();
      table.string('body');
      table.integer('author_id')
         .references('uid')
         .inTable('users');
      table.integer('post_id')
         .references('id')
         .inTable('posts');
      table.dateTime('postDate');
    }),

  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('posts'),
    knex.schema.dropTable('users'),
  ]);
