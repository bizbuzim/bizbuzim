const express = require("express");
const { postgraphile } = require("postgraphile");

const app = express();


const buildURI = () => {
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const database = process.env.POSTGRES_DATABASE;
  let host = `${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}`;
  if (process.env.INSTANCE_CONNECTION_NAME) {
    const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';
    host = `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`
  }
  return `postgres://${user}:${password}@${host}/${database}?sslmode=disable`
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

