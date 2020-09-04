const router = require("express").Router();
const db = require("./db");

const updateCardState = require("./flashcard/controller/card.controller");

// TODO: move to each specific routes file
router.get("/tab-blocks", (req, res) => res.send(db.tabBlocks));

// TODO: move to each specific routes file
router.get("/flashcard-blocks", (req, res) => res.send(db.flashcardBlocks));
router.put("/flashcard-blocks/:blockId/:cardId", updateCardState);

// TODO: move to each specific routes file
router.get("/knowledge-check-blocks", (req, res) =>
  res.send(db.knowledgeCheckBlocks)
);

module.exports = router;
