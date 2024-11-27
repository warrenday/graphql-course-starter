import express from "express";

const app = express();

async function startServer() {
  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
}

startServer();
