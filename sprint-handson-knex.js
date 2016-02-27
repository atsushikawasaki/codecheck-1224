'use strict';
var knex = require('knex')({
	client: 'sqlite3',
	connection: {
		// このèåで、データベースをメモリåにçæする（æçæはなくなる）
		// `filename: "somefile.sqlite"` とかで、ファイルにデータをäåできる（ファイルåはèç）
		filename: ":memory:"
	    }
	});
var sqls = require('fs')
    .readFileSync(__dirname + '/specifications/database.sql')
    .toString()
    .split(/;$/m);

var allSQLs = sqls.map(function (sql) {
	return sql.trim();
    }).filter(function (sql) {
	    // SQLæがçだと `Segmentation fault: 11` がççするのでåりæてる
	    return !!sql;
	}).map(function (sql) {
		return knex.raw(sql);
	    });

// åéのSQLをåèしてテーブルをäæがåäしたらサーバーをèå
Promise.all(allSQLs).then(function () {

  knex
      .insert({
	      title: "this is a title",
		  description: "this is a long long long lorem ipsum",
		  url: "https://gist.github.com/takayukioda/39ca7626b8175bc26983"
		  })
      .into('projects')
      .then(function (ids) {
	      console.log("Inserted", ids);
	  })
      // SELECT all
  knex
      .select('*')
      .from('projects')
      .then(function (rows) {
	      console.log("SELECT", rows);
	  });

  // SELECT with condition
  knex
      .select('*')
      .from('projects')
      .where({id: 1})
      .then(function (row) {
	      console.log("SELECT with WHERE", row);
	  })

      // DELETE with condition
  knex
      .del()
      .from('projects')
      .where({id: 1})
      .then(function (ids) {
	      console.log("DELETE");
	  });
    });