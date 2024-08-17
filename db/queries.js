const pool = require("./pool");

module.exports.getMessages = async () => {
  const dbResponse = await pool.query("SELECT * FROM messages;");
  console.log(dbResponse.rows);
  return dbResponse.rows;
};

module.exports.createMessage = async (name, message) => {
  const dbResponse = await pool.query(
    "INSERT INTO messages (name, message) VALUES ($1, $2)",
    [name, message]
  );
  return dbResponse;
};
