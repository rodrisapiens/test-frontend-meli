const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send({ message: "hola, el server funciona bien" });
});
app.listen(PORT, () => {
  console.log(`hello server, we are listening to port ${PORT}`);
});
