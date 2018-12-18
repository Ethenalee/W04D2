const settings = require("./settings");
const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];
var moment = require('moment');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


knex('famous_people')
  .returning('*')
  .insert({first_name: firstName, last_name: lastName, birthdate: birthDate})
  .then(() => knex('famous_people').select('*'))
  .then((result)=> {
    console.log(result);
  })
  .finally(() => {
    knex.destroy();
  })


