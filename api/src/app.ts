import express from "express";

async function main() {
  const app = express();
  const port = process.env.PORT;

  app.listen(port, () => {
    console.log("server running at 8080");
  });
}

main().catch((err) => {
  console.log(err);
});
