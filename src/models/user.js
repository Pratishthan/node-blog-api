const db = require("../db");
class user {
  static create(name, address, email, password, admin) {
    return db.execute(
      `insert into user (name, address, email, password, admin)
        values("${name}","${address}","${email}","${password}","${admin}")`
    );
  }
  static getUsers() {
    return db.execute(`select id, name, address, email,admin from user`);
  }
  static getUserByUserId(id) {
    return db.execute(
      `select id, name, address, email from user where id="${id}"`
    );
  }
  static updateUser(name, address, email, password) {
    return db.execute(
      `update user set name="${name}", address="${address}",email="${email}", password="${password}" where email = "${email}"`
    );
  }
  static deleteUser(id) {
    return db.execute(`delete from user where id="${id}"`);
  }
  static getUserByUserEmail(email) {
    return db.execute(`select * from user where email = "${email}" `);
  }
  static signUp(name, address, email, password, admin) {
    return db.execute(
      `insert into test.user (name, address, email, password,admin) values
            ("${name}","${address}","${email}","${String(password)}",${admin})`
    );
  }
}
module.exports = user;
