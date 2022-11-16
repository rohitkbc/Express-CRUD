const express = require("express");
const app = express();
const port = 8000;
const data = require("./data.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/view", (req, res) => {
  res.send(data);
});

app.post("/add", (req, res) => {
  var id = data[data.length - 1].id;
  id = parseInt(id);
  const obj = {
    id: `${id + 1}`,
    quote: req.body.quote,
    author: req.body.author,
  };
  data.push(obj);
  res.send({ msg: `Id = ${id + 1}, Data added successfully` });
});

app.delete("/remove/:id", (req, res) => {
  const index = data.findIndex((item) => item.id === req.params.id);
  console.log(index);
  if (index == -1) {
    res.send({ msg: "objectId " + req.params.id + " not found" });
  } else {
    data.splice(index, 1);
    res.send({ msg: "objectId " + req.params.id + " removed successfully" });
  }
});

app.put("/update/:id", (req, res) => {
  const index = data.findIndex((item) => item.id === req.params.id);
  console.log(index);
  if (index == -1) {
    res.send({ msg: "objectId " + req.params.id + " not found" });
  } else {
    const obj = {
        id: req.params.id,
        quote: req.body.quote,
        author: req.body.author,
      };
    data[index] = obj;
    res.send({ msg: "objectId " + req.params.id + " updated successfully" });
  }
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
