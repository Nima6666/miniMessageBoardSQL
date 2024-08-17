const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  message VARCHAR ( 255 )
);
`;

async function main() {
  try {
    console.log("Connecting to the database...");
    const client = new Client({
      connectionString: `postgresql://${process.env.DBUSER}:${process.env.PASSWORD}@localhost:5432/messageboard`,
    });
    await client.connect();

    // Check if the table already exists
    const tableExistsQuery = `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'messages'
        );
      `;
    const result = await client.query(tableExistsQuery);
    const tableExists = result.rows[0].exists;

    if (tableExists) {
      console.log("Table 'messages' already exists.");
    } else {
      console.log("Table 'messages' does not exist. Creating now...");
      await client.query(SQL);
      console.log("Table 'messages' created successfully.");
    }

    await client.end();
    console.log("Database operation completed.");
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

main();
