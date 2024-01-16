const express = require("express");
const fs = require("fs");
const shortid = require("shortid");
const moment = require("moment");

const router = new express.Router();
const previousCustomers = "./cus.txt";
console.log("path", previousCustomers);

//current timestamp
const timestamp = moment().format("YYYY/MM/DD, hh:mm A");

router.post("/new-customer", async (req, res) => {
  console.log(req.body);
  const customers = JSON.parse(fs.readFileSync(previousCustomers), "utf-8");
  try {
    if (!req.body) throw new Error("Field should no be empty");
    if (!req.body.name) throw new Error("The field Name is required");

    console.log("customers", Object.values(customers));
    const isCustomerExist = Object.values(customers)
      .map((data) => data.name)
      .includes(req.body.name);
    console.log(isCustomerExist);
    if (isCustomerExist) throw new Error("Customer already exist");
    const id = shortid.generate();
    const newCustomer = {
      [id]: {
        name: req.body.name,
        number: req.body.phone,
        id,
        createdAt: timestamp.split(",")[0],
        lastLogin: timestamp,
      },
    };
    let addCustomer = { ...customers, ...newCustomer };
    fs.writeFileSync(
      previousCustomers,
      JSON.stringify(addCustomer),
      function (err) {
        if (err) return console.log(err);
      }
    );
    res.status(201).send(newCustomer);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});
router.get("/customers", async (req, res) => {
  const customers = JSON.parse(fs.readFileSync(previousCustomers), "utf-8");

  try {
    res.status(200).send(customers);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});
router.patch("/customer", async (req, res) => {
  try {
    const customers = JSON.parse(fs.readFileSync(previousCustomers), "utf-8");
    const { id, field, props } = req.body;
    console.log(id, field, props);
    console.log(customers[id]);
    customers[id][field] = props.value;
    fs.writeFileSync(
      previousCustomers,
      JSON.stringify(customers),
      function (err) {
        if (err) return console.log(err);
      }
    );
    res.status(200).send(customer[id]);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
