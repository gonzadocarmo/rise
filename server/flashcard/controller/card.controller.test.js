const supertestLib = require("supertest");

const app = require("../../index");
const supertest = supertestLib(app());

describe("updateCardState", () => {
  describe("when request is not valid", () => {
    describe("when blockId param not valid", () => {
      it("should return http 400 w/error", (done) => {
        supertest
          .put("/flashcard-blocks/some/thing")
          .expect(400, { message: 'blockId: "some" is not valid' }, (err) => {
            if (err) throw err;
            done();
          });
      });
    });
    describe("when cardId param not valid", () => {
      it("should return http 400 w/error", (done) => {
        supertest
          .put("/flashcard-blocks/1/thing")
          .expect(400, { message: 'cardId: "thing" is not valid' }, (err) => {
            if (err) throw err;
            done();
          });
      });
    });
  });
  describe("when request is valid", () => {
    describe("when card update ok", () => {
      it("should return 204 http status code", (done) => {
        supertest.put("/flashcard-blocks/1/1").expect(204, (err) => {
          if (err) throw err;
          done();
        });
      });
    });
    describe("when card not found", () => {
      it("should return 404 http status code", (done) => {
        supertest
          .put("/flashcard-blocks/1/100000000")
          .expect(404, { message: "Card not found!" }, (err) => {
            if (err) throw err;
            done();
          });
      });
    });
  });
});
