import React, { Fragment, useState, useEffect } from "react";
import { Card } from "./features/card/Card";

const API_URL = process.env.API_URL || "http://localhost:5000";
export default () => {
  const initialState: FlashCardBlocksType = [];
  const [results, setResults] = useState(initialState);

  useEffect(() => {
    fetch(`${API_URL}/flashcard-blocks`)
      .then((r) => r.json())
      .then((data) => setResults(data));
  }, []);

  return (
    <div className="App">
      <div className="noOutline">
        <div>
          <div
            className="block-flashcards blocks-flashcard--column"
            style={{ paddingTop: "30px", paddingBottom: "30px" }}
          >
            <div className="block-flashcards__wrapper">
              {results.length > 0 ? (
                renderBlocksOfCards(results)
              ) : (
                <h1>NO DATA</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderBlocksOfCards = (results: FlashCardBlocksType) => {
  return results.map((result, resultIdx) => (
    <Fragment key={result.id}>
      <div
        className="block-text block-text--heading"
        style={{
          paddingTop: "30px",
          paddingBottom: "30px"
        }}
      >
        <div className="block-text__container">
          <div className="block-text__row">
            <div className="block-text__col brand--head">
              <h2>
                <div className="brand--linkColor">
                  <div aria-hidden="false" className="brand--linkColor">
                    <div className="fr-view">
                      Flashcards Block #{resultIdx + 1}
                    </div>
                  </div>
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {result.cards.map((card, cardIdx) => (
        <Card
          key={`block-${resultIdx}--card-${cardIdx}`}
          data={card}
          onFlip={(cardId: number) =>
            onFlipHandler({ blockId: result.id, cardId })
          }
        />
      ))}
    </Fragment>
  ));
};

const onFlipHandler = (request: onFlipRequest) => {
  fetch(`${API_URL}/flashcard-blocks/${request.blockId}/${request.cardId}`, {
    method: "PUT"
  });
};

//TODO: move to separate d.ts file
type FlashCardBlocksType = Array<FlashCardBlockType>;
interface FlashCardBlockType {
  id: number;
  cards: Array<Card>;
}
export interface Card {
  state: CardState;
  id: number;
  front: {
    type: string;
    content: string;
  };
  back: {
    type: string;
    content: string;
  };
}

export enum CardState {
  FRONT = "f",
  BACK = "b"
}

interface onFlipRequest {
  blockId: number;
  cardId: number;
}
//TODO: move to separate d.ts file
