const app = require("./app");
const sql = require("mssql");
const config = require("./config/config");
const sqlConfig = require("./config/sqlConfig");

let server;

async () => {
  try {
    server = await sql.connect(sqlConfig);

    const result = await sql.query`select * from mytable`;
    console.dir(result);
  } catch (e) {
    console.log(e.message);
  }
};

const errorHandler = (error) => {
  console.log(error);
};

const exitHandler = () => {
  if (server) {
    server.close;
  }
};

sql.on("error", errorHandler);

app.listen(config.port);
