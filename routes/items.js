const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/authMiddleware");

const items = [];

const generateItemId = () => {
  return Math.floor(Math.random() * 1000).toString();
};

const findItemById = (req, res, next) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  req.item = item;
  next();
};

router.post("/", isAdmin, (req, res) => {
  const { name, price, size } = req.body;
  const id = generateItemId();

  const newItem = { id, name, price, size };
  items.push(newItem);

  res.status(201).json(newItem);
});

router.get("/", (req, res) => {
  res.json(items);
});

router.get("/:id", findItemById, (req, res) => {
  res.json(req.item);
});

router.patch("/:id", isAdmin, findItemById, (req, res) => {
  const { name, price, size } = req.body;
  const updatedItem = { ...req.item, name, price, size };

  const index = items.findIndex((item) => item.id === req.item.id);
  items[index] = updatedItem;

  res.json(updatedItem);
});

router.delete("/:id", isAdmin, findItemById, (req, res) => {
  const index = items.findIndex((item) => item.id === req.item.id);
  items.splice(index, 1);

  res.status(204).send();
});

module.exports = router;
