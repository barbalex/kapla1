'use strict'

export default function (db, idGeschaeft, field, value) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE
        geschaefte
      SET
        ${field} = '${value}'
      WHERE
        idGeschaeft = ${idGeschaeft}`

    db.run(sql, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}
