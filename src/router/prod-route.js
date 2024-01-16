const express = require("express");
const fs = require("fs");
const shortid = require("shortid");
const router = new express.Router();
const previousproducts = "./cus.txt";
console.log("path", previousProducts);

const products = JSON.parse(fs.readFileSync(previousProducts), "utf-8");

router.post("/new-product", async (req, res) => {
  try {
    if (!req.body) throw new Error("Field should no be empty");
    if (!req.body.name) throw new Error("The field Name is required");

    console.log("products", products);
    const isProductExist = Object.keys(products).includes(req.body.name);
    console.log(isProductExist);
    if (isProductExist) throw new Error("Product already exist");
    const newProduct = {
      [req.body.name]: { ...req.body, id: shortid.generate() },
    };
    let addProduct = { ...products, ...newProduct };
    fs.writeFileSync(
      previousproducts,
      JSON.stringify(addProduct),
      function (err) {
        if (err) return console.log(err);
      }
    );
    res
      .status(201)
      .send("Product " + req.body.name + " details stored successfully");
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

router.get("/products", (req, res) => {
  console.log(inside);
  try {
    res.status(200).send(products);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

module.exports = router;
