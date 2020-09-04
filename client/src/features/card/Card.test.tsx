import React from "react";
import { Card } from "./Card";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Card", () => {
  describe("when state = f", () => {
    let data;
    const onFlipHandler = jest.fn();

    beforeEach(() => {
      data = {
        id: 1,
        state: "f",
        front: {
          type: "text",
          content: "say hi!"
        },
        back: {
          type: "text",
          content: "say bye!"
        }
      };
      render(<Card data={data} onFlip={onFlipHandler} />);
    });

    test("should render front card", () => {
      expect(screen.getByText("say hi!")).toBeVisible();

      expect(screen.getByTestId("card-front").parentElement).toHaveStyle({
        position: "relative"
      });
      expect(screen.getByTestId("card-back").parentElement).toHaveStyle({
        position: "absolute"
      });
    });

    describe("when clicked", () => {
      beforeEach(() => fireEvent.click(screen.getByText("say hi!")));

      test("should show back card", () => {
        expect(screen.getByTestId("card-front").parentElement).toHaveStyle({
          position: "absolute"
        });
        expect(screen.getByTestId("card-back").parentElement).toHaveStyle({
          position: "relative"
        });
      });

      test("should execute onFlip handler", () => {
        expect(onFlipHandler).toHaveBeenCalled();
      });
    });
  });
  describe("when state = b", () => {
    test("should render back card", () => {
      const data = {
        id: 1,
        state: "b",
        front: {
          type: "text",
          content: "say hi!"
        },
        back: {
          type: "text",
          content: "say bye!"
        }
      };
      render(<Card data={data} />);

      expect(screen.getByText("say bye!")).toBeVisible();
      expect(screen.getByTestId("card-front").parentElement).toHaveStyle({
        position: "absolute"
      });
      expect(screen.getByTestId("card-back").parentElement).toHaveStyle({
        position: "relative"
      });
    });
  });

  describe("when content type = text", () => {});
  describe("when content type = image", () => {});
});
