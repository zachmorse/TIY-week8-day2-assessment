const apiApp = require("../api");
const assert = require("assert");
const request = require("supertest");

describe("Mocha testing", () => {
  describe("Get /api/customer/items", () => {
    it("should return all data", done => {
      request(apiApp)
        .get("/api/customer/items")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(res => {
          var success = res.body["vendingData"]["status"];
          assert.equal(success, "success");
        })
        .end(done);
    });
  });

  describe("Post /api/customer/items/:itemId/purchases", () => {
    it("should purchase an item and reduce the quantity by one", done => {
      request(apiApp)
        .post("/api/customer/items/2/purchases")
        .expect(200)
        .expect(res => {
          var record = res.body.retrievedRecord.quantity;
          assert.equal(record, 9);
        })
        .end(done);
    });
  });

  describe("GET /api/vendor/purchases", () => {
    it("should get a list of all purchases with their item and date/time", done => {
      request(apiApp)
        .get("/api/vendor/purchases")
        .expect(200)
        .expect(res => {
          var success = res.body["purchaseData"]["status"];
          assert.equal(success, "success");
        })
        .end(done);
    });
  });

  describe("GET /api/vendor/money", () => {
    it("should get a total amount of money accepted by the machine", done => {
      request(apiApp)
        .get("/api/vendor/money")
        .expect(200)
        .expect(res => {
          var money = res.body["vendingData"]["money"];
          assert.equal(money, 425);
        })
        .end(done);
    });
  });

  describe("POST /api/vendor/items", () => {
    it("should add a new item not previously existing in the machine", done => {
      request(apiApp)
        .post("/api/vendor/items")
        .send({
          id: 5,
          description: "Reeses Cup",
          cost: 85,
          quantity: 15
        })
        .expect(200)
        .expect(res => {
          var length = res.body["vendingData"]["data"].length;
          assert.equal(length, 5);
        })
        .end(done);
    });
  });

  describe("PUT /api/vendor/items/:itemId", () => {
    it("should update item quantity, description, and cost", done => {
      request(apiApp)
        .put("/api/vendor/items/2")
        .send({
          id: 2,
          description: "Gum",
          cost: 45,
          quantity: 10
        })
        .expect(200)
        .expect(res => {
          var cost = res.body["vendingData"]["data"][2]["cost"];
          assert.equal(cost, 45);
        })
        .end(done);
    });
  });
});
