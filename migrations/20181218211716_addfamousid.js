
exports.up = function(knex, Promise) {
return Promise.all([
    knex.schema.table('milestones', function(table) {
    table.bigInteger('famous_person_id').references('idid').inTable('famous_people').notNull()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table) {
    table.dropColumn('famous_person_id')
  })
  ])

};
