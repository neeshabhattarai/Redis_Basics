const express = require("express");
const app = express();
const itemRoute = require("./route/itemRoute");
const likeRoute = require("./route/likeRoute");
const userRoute = require("./route/userRoute");
const bidRoute = require("./route/bidRoute");

app.use(express.json());

app.use("/item", itemRoute);
app.use("/like", likeRoute);
app.use("/user", userRoute);
app.use("/bid", bidRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});