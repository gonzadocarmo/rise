const updateCardState = require("./card.model");

jest.mock("../../db.js", () => ({
  flashcardBlocks: [
    {
      id: 9,
      cards: []
    },
    {
      id: 1,
      cards: [{ id: 1, state: "f" }]
    }
  ]
}));

describe("updateCardState", () => {
  describe("when block not found", () => {
    it("should return undefined", () => {
      const result = updateCardState(99, 100);
      expect(result).toBeUndefined();
    });
  });
  describe("when card not found", () => {
    it("should return undefined", () => {
      const result = updateCardState(1, 100);
      expect(result).toBeUndefined();
    });
  });
  describe("when card found", () => {
    it("should return updated result", () => {
      const result = updateCardState(1, 1);
      expect(result).toEqual([
        { cards: [], id: 9 },
        { cards: [{ id: 1, state: "b" }], id: 1 }
      ]);
    });
  });
});
