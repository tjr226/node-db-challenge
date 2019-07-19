
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
        tbl.increments();
        tbl.string('project_name', 128).notNullable();
        tbl.string('project_description', 256);
        tbl.boolean('is_completed').defaultTo(0);
    })
    .createTable('actions', tbl => {
        tbl.increments();
        tbl.string('action_description', 128).notNullable();
        tbl.string('action_notes', 256);
        tbl.boolean('is_completed').defaultTo(0);
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('actions')
    .dropTableIfExists('projects')
};
