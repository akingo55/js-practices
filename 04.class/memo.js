#!/usr/bin/env node

const { Select } = require('enquirer')
const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database(process.env.DB_NAME)
const args = require('minimist')(process.argv.slice(2))

class Memo {
  constructor (content = '') {
    this.content = content
  }

  add () {
    db.serialize(() => {
      db.get(`SELECT COUNT(*) FROM ${process.env.TABLE_NAME}`, (err, row) => {
        if (err) return console.log(err)
        const count = row['COUNT(*)']
        db.run(`INSERT INTO ${process.env.TABLE_NAME} VALUES(?, ?)`, [count + 1, this.content.join('\n')], (err) => {
          if (err) return console.log(err)
        })
      })
    })
    db.close()
  }

  list () {
    db.serialize(() => {
      db.each(`SELECT * FROM ${process.env.TABLE_NAME}`, (err, row) => {
        if (err) return console.log(err)
        if (row.content.includes('\n')) {
          const firstLine = row.content.split('\n', 1)
          console.log(firstLine.join())
        } else {
          console.log(row.content)
        }
      })
      db.close()
    })
  }

  show () {
    db.serialize(() => {
      db.all(`SELECT * FROM ${process.env.TABLE_NAME}`, (err, rows) => {
        if (err) return console.log(err)

        const contentList = this.#createContentList(rows)
        const prompt = new Select({
          type: 'select',
          name: 'content',
          message: 'Choose a note you want to see:',
          choices: contentList
        })
        prompt.run()
          .then(answer => {
            db.get(`SELECT content from ${process.env.TABLE_NAME} where id = ${answer}`, (err, row) => {
              if (err) return console.log(err)
              console.log(row.content)
              db.close()
            })
          })
          .catch(console.error)
      })
    })
  }

  delete () {
    db.serialize(() => {
      db.all(`SELECT * FROM ${process.env.TABLE_NAME}`, (err, rows) => {
        if (err) return console.log(err)

        const contentList = this.#createContentList(rows)
        const prompt = new Select({
          type: 'select',
          name: 'content',
          message: 'Choose a note you want to delete:',
          choices: contentList
        })
        prompt.run()
          .then(answer => {
            db.run(`DELETE FROM ${process.env.TABLE_NAME} where id = ${answer}`, (err, row) => {
              if (err) return console.log(err)
              db.close()
            })
          })
          .catch(console.error)
      })
    })
  }

  #createContentList (rows) {
    const contentList = []
    rows.forEach(function (element) {
      if (element.content.includes('\n')) {
        const firstLine = element.content.split('\n', 1)
        contentList.push({ message: firstLine.join(), value: element.id })
      } else {
        contentList.push({ message: element.content, value: element.id })
      }
    })
    return contentList
  }
}

class App {
  run () {
    if (process.stdin.isTTY) {
      const memo = new Memo()
      if (args.l) {
        memo.list()
      } else if (args.r) {
        memo.show()
      } else if (args.d) {
        memo.delete()
      }
    } else {
      const rl = require('readline').createInterface({ input: process.stdin })
      const lines = []
      rl.on('line', (line) => {
        lines.push(line)
      })
      rl.on('close', () => {
        const memo = new Memo(lines)
        memo.add()
      })
    }
  }
}

const main = new App()
main.run()
