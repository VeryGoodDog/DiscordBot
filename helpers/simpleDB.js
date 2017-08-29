const EventEmitter = require('events').EventEmitter;
const sql = require('sqlite');
const config = require('../config/config.json');


class simpleDB extends EventEmitter {
  constructor(options = {}) {
    super();
    if (typeof options !== 'object') options = {};
    if (options.path === 'undefined') options.path = `${config.root}/data`;
    if (options.name === 'undefined') options.name = 'data';
    this.name = options.name;
    this.filename = `${options.name}.sqlite`;
    this.path = options.path;
    this.pathToDB = `${this.path}/${this.filename}`;
    sql.open(this.pathToDB).then(() => {
      sql.run(`CREATE TABLE IF NOT EXISTS ${this.name} (key TEXT, val TEXT)`);
    }).then(() => {
      this.state = 'ready';
      this.emit('ready');
    });
  }

  async set(key, val) {
    if (this.state !== 'ready') throw new Error('DB not ready.');
    if (typeof key !== 'string') return;
    if (typeof val === 'undefined') return;
    sql.get(`SELECT * FROM ${this.name} WHERE key ="${key}"`).then(row => {
      if (!row) {
        sql.run(`INSERT INTO ${this.name} (key, val) VALUES (?, ?)`, [key, val]).then(() => {
          return true;
        });
      } else {
        sql.run(`UPDATE ${this.name} SET val ="${val}" WHERE key ="${key}"`).then(() => {
          return true;
        });
      }
    });
  }

  async get(key) {
    if (this.state !== 'ready') throw new Error('DB not ready.');
    if (typeof key !== 'string') throw new Error('key must be a string');
    let val = await sql.get(`SELECT * FROM ${this.name} WHERE key ="${key}"`).then(row => {
      return row.val;
    });
    return val;
  }
}

module.exports = simpleDB;