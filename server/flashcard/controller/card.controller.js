const modelUpdateCardState = require("../model/card.model");

const updateCardState = (req, res) => {
  if (isNaN(req.params.blockId)) {
    return res
      .status(400)
      .json({ message: `blockId: "${req.params.blockId}" is not valid` });
  }
  if (isNaN(req.params.cardId)) {
    return res
      .status(400)
      .json({ message: `cardId: "${req.params.cardId}" is not valid` });
  }

  const result = modelUpdateCardState(req.params.blockId, req.params.cardId);

  if (!result) return res.status(404).json({ message: "Card not found!" });

  res.send(204);
};

module.exports = updateCardState;
