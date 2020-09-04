const db = require("../../db");

const updateCardState = (blockId, cardId) => {
  // update (toggle in this case) the state field for the specific card
  const blockFromCard = db.flashcardBlocks.find((e) => e.id == blockId);
  if (!blockFromCard) return undefined;

  const cardToUpdate = blockFromCard.cards.find((e) => e.id == cardId);
  if (!cardToUpdate) return undefined;

  cardToUpdate.state = cardToUpdate.state === "f" ? "b" : "f";
  // TODO: handle error when not able to update state...

  return db.flashcardBlocks;
};

module.exports = updateCardState;
