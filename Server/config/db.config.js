const { connect } = require("mongoose");

const connect_db = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DATABASE_NAME
        });
        return console.log(`✅ DB Connected: ${conn.connection.db.databaseName}`)
    } catch (err) {
        console.log(err)
        return process.exit(1);
    }
}

module.exports = connect_db;