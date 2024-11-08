const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to MySQL Server!");
});

// it check the creditionals with the database if correct then sends to the app.html otherwise throw error

function getLogin() {
  var emailValue = document.getElementById("e_email").value;

  var pwdValue = document.getElementById("e_password").value;

  if (emailValue && pwdValue) {
    connection.query(
      "SELECT * FROM employee where e_email = ? and e_password =?",
      [emailValue, pwdValue],
      function (err, result, fields) {
        if (result.length > 0) {
          console.log("auth done!");
          sessionStorage.setItem("e_name", result[0].e_name);
          sessionStorage.setItem("e_id", result[0].id);
          sessionStorage.setItem("o_id", result[0].o_id_id);
          window.location.href = "app.html";
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Invalid Login",
          });
          console.log("no result!");
        }
      }
    );
  }
  else
  {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Enter Email and Password!",
    });
  }
}
