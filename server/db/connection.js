const Sequelize = require('sequelize');

const PostgresqlURI = 'postgres://cjfkramzfgxebw:a8ab9c448f6d5e2060b2869f931f1eac62f2556f69028d8e6ea7330895a97257@ec2-107-21-226-44.compute-1.amazonaws.com:5432/ddju48ok87l9jp';

const options = {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
    },
}

const sequelize = new Sequelize(PostgresqlURI, options);

module.exports = sequelize;
/*
const testConnection = () =>{
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return true;
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        return false;
    });
}
*/

/*
try {
    sequelize.close()
} catch (error) {
    console.log(error);
}

*/
/*
const client = new Client({
    connectionString: PostgresqlURI,
    ssl: true,
});

client.connect();

const testDatabase = () => {
    try {
        client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
            if (err) throw err;
            for (const row of res.rows) {
                console.log(JSON.stringify(row));
            }
            client.end();
        });

    } catch (error) {
        console.error(error);
    }
}




const createTables = (schema) =>
{
    try {
        client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
            if (err) throw err;
            for (const row of res.rows) {
                console.log(JSON.stringify(row));
            }
            client.end();
        });

    } catch (error) {
        console.error(error);
    }

}
*/
