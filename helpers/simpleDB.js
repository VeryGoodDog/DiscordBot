const EventEmitter = require('events').EventEmitter
const sql = require('sqlite3')
const config = require('../config/config.json')


class simpleDB extends EventEmitter {
  constructor(options = {}) {
    super()
    if (typeof options !== 'object') options = {}
    if (options.path === 'undefined') options.path = `${config.root}/data`
    if (options.name === 'undefined') options.name = 'data'
    this.name = options.name
    this.filename = `${this.name}.sqlite3`
    this.path = options.path
    this.pathToDB = `${this.path}/${this.filename}`
    this.defaultCallback = (err,args) => {
      if (err) return console.error(err)
    }
    this.db = new sql.Database(this.pathToDB, err => {
      if (err) throw new Error(err)
      this.db.run(`CREATE TABLE IF NOT EXISTS ${this.name} (key TEXT, val TEXT)`,(err) => {
        if (err) throw new Error(err)
        this.state = 'ready'
        this.emit('ready')
      })
    })
  }

  set(key, val, cb = this.defaultCallback) {
    if (this.state !== 'ready') throw new Error('DB not ready.')
    if (typeof key !== 'string') throw new Error('key must be a string.')
    if (typeof val === 'undefined') throw new Error('val must be defined.')
    val = JSON.stringify(val).replace(/["]+/g, '\'')
    this.db.get(`SELECT * FROM ${this.name} WHERE key ="${key}"`, (err,row) => {
      let keyVal = {1:key,2:val}
      if (!row) {
        this.db.run(`INSERT INTO ${this.name} (key, val) VALUES (?1, ?2)`,keyVal, (err) => {
          if (err) return console.error(err)
          this.get(key,cb)
        })
      } else {
        this.db.run(`UPDATE ${this.name} SET val =?2 WHERE key =?2`,keyVal, (err) => {
          if (err) return console.error(err)
          console.log('update: ',key)
          this.get(key,cb)
        })
      }
    })
  }

  get(key, cb = this.defaultCallback) {
    if (this.state !== 'ready') throw new Error('DB not ready.')
    if (typeof key !== 'string') throw new Error('key must be a string.')
    this.db.get(`SELECT * FROM ${this.name} WHERE key ="${key}"`, (err,row) => {
      console.log('key: ',key);
      let val = row ? row.val : undefined
      if (val) {
        val = val.replace(/[\']+/g,'"')
        let json = JSON.parse(val)
        if (json) {
          cb(null,json)
          return
        } else {
          cb(null,val)
          return
        }
      }
      let error = new Error(`No key ${key} found.`)
      cb(error,null)
      return
    })
  }

  async del(key,cb = this.defaultCallback) {
    if (this.state !== 'ready') throw new Error('DB not ready.')
    if (typeof key !== 'string') throw new Error('key must be a string.')
    this.db.get(`SELECT * FROM ${this.name} WHERE key ="${key}"`, (err,row) => {
      if (row) {
        this.db.run(`DELETE FROM ${this.name} WHERE key ="${key}"`,(err,row) => {
          console.log(row);
        })
      } else {
        console.log('no such row');
      }
    })
  }
}

module.exports = simpleDB