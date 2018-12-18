
const settings = require("./settings");
const firstname = process.argv[2];
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


knex.from('famous_people').select()
    .where({first_name: firstname})
    .then((result) => {
      console.log('Found', result.length, 'person(s) by the name', `'${firstname}' :`);
      for (let i = 0; i < result.length; i ++ ) {
      console.log( `-${i + 1}` , result[i].first_name, result[i].last_name, ', born ', moment(result[i].birthdate).format('YYYY-MM-DD'))
      }
    }
    )
    .catch((err) => {console.log('Error', err)})
    .finally(() => {
      knex.destroy();
    })
