const express = require("express");
const app = express();
const port = process.env.PORT || 4500;
const vendingData = require("./dataFiles/data");
const purchaseData = require("./dataFiles/purchase");
const bodyParser = require("body-parser");

// --- MIDDLEWARE:

app.use(bodyParser.json());

// --- ENDPOINTS:

app.get("/api/customer/items", (req, res) => {
  vendingData.status = "success";
  res.json({ vendingData });
});

app.post("/api/customer/items/:itemId/purchases", (req, res) => {
  var itemId = req.params.itemId - 1;
  var retrievedRecord = vendingData.data[itemId];
  retrievedRecord.quantity -= 1;
  res.json({ retrievedRecord });
});

app.get("/api/vendor/purchases", (req, res) => {
  purchaseData.status = "success";
  res.json({ purchaseData });
});

app.get("/api/vendor/money", (req, res) => {
  vendingData.status = "success";
  res.json({ vendingData });
});

app.post("/api/vendor/items", (req, res) => {
  var addInventory = req.body;
  vendingData.data.push(addInventory);
  res.json({ vendingData });
});

app.put("/api/vendor/items/:itemId", (req, res) => {
  var itemId = req.params.itemId;
  var recordForAlteration = vendingData.data[itemId - 1];
  recordForAlteration = {
    id: itemId,
    description: req.body.description,
    cost: req.body.cost,
    quantity: req.body.quantity
  };

  vendingData.data.splice(itemId, 1, recordForAlteration);
  vendingData.status = "success";
  res.json({ vendingData });
});

// ---- LISTENER:

app.listen(port);

module.exports = app;
