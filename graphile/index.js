const express = require("express");
const { postgraphile } = require("postgraphile");
const Knex = require('knex');

const app = express();

const createUnixSocketPool = async config => {
  const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';
  const host = `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`
  return Knex({
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER, 
      password: process.env.POSTGRES_PASSWORD, 
      database: process.env.POSTGRES_DATABASE, 
      host,
    },
    ...config,
  });
};
let buildURI = () => {
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const database = process.env.POSTGRES_DATABASE;
  const port = process.env.POSTGRES_PORT;
  const host = process.env.POSTGRES_HOST;
  return `postgres://${user}:${password}@${host}:${port}/${database}?sslmode=disable`
}
if (process.env.INSTANCE_CONNECTION_NAME) {
  buildURI = createUnixSocketPool
}
app.use(
  postgraphile(
    buildURI(),
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      allowExplain: true,
      retryOnInitFail: true,
      disableQueryLog: true,
    }
  )
);

app.listen(process.env.PORT || 5000);

