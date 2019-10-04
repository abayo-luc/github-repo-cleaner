import express from "express";
import routers from "./src/routes";
import path from "path";
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));
const PORT = process.env.PORT || 3000;
app.get("/", (_req, res) =>
  res.sendFile(path.join(__dirname + "/views/index.html"))
);
app.use("/api/v1", routers);
app.use("*", (req, res) => res.json({ message: "Enpoint not found" }));
app.listen(PORT, () => {
  console.log(`The app is listening to ${PORT}`);
});
