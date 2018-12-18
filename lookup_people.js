const pg = require("pg");
const settings = require("./settings"); // settings.json
var moment = require('moment');
const firstname = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((error) => {
  if (error) {
    return console.error("Connection Error", error);
  }

  client.query(`SELECT * FROM famous_people WHERE first_name = '${firstname}'`, (error, results) => {
    if(error) throw error;

    console.log('Found', results.rowCount, 'person(s) by the name', `'${firstname}' :`);

    const answerarray = results.rows;
    for (let i = 0; i < answerarray.length; i++) {
    console.log( `-${i + 1} ` , answerarray[i].first_name, answerarray[i].last_name, ', born ', moment(answerarray[i].birthdate).format('YYYY-MM-DD'));
    }

    client.end((error) => {
      if(error) throw error;
    });
  });
});