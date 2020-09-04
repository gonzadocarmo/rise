import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import classnames from "classnames";
import "./Card.css";
import { Card as CardType, CardState } from "../../App";

export const Card: React.SFC<CardComponent> = ({ data, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(data.state === CardState.BACK);

  const handleClick = (e: any, cardId: number) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
    onFlip(cardId);
  };

  const containerStyle = {
    maxWidth: "280px",
    maxHeight: "280px",
    display: "inline-block",
    position: "relative",
    margin: "0 auto",
    width: "100%",
    minWidth: "280px",
    minHeight: "280px",
    boxSizing: "border-box",
    perspective: "1000px",
    transform: "scale(.9) translateZ(0)",
    willChange: "transform",
    cursor: "pointer"
  };

  const renderFrontCard = (blockId: number, content: string) => (
    <div
      data-testid="card-front"
      onClick={(e) => handleClick(e, blockId)}
      className="block-flashcard__front block-flashcard__front--description"
    >
      <div className="block-flashcard__content brand--border">
        <div
          className="block-flashcard__center brand--linkColor"
          aria-label={`Flashcard front - ${content}`}
        >
          <div
            aria-hidden="true"
            className="block-flashcard__description brand--head brand--linkColor"
          >
            <div className="fr-view">{content}</div>
          </div>
        </div>
      </div>
      <button className="block-flashcard__flip brand--ui">
        <span className="flip-text"></span>
        <span className="flip-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="17"
            viewBox="0 0 23 17"
            focusable="false"
          >
            <path
              fillRule="nonzero"
              d="M19.347 8.275l1.88 1.714a.727.727 0 0 0 .98-1.074l-3.225-2.941a.727.727 0 0 0-1.027.047l-2.94 3.224a.727.727 0 0 0 1.075.98l1.802-1.976a6.545 6.545 0 0 1-11.56 4.288.727.727 0 1 0-1.114.935 8 8 0 0 0 14.129-5.197zm-16.039.162l-1.79-1.633a.727.727 0 1 0-.98 1.074l3.223 2.94c.297.272.757.25 1.028-.046l2.94-3.224a.727.727 0 0 0-1.075-.98L4.768 8.636a6.545 6.545 0 0 1 11.555-4.482.727.727 0 1 0 1.114-.936A8 8 0 0 0 3.308 8.437z"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  );

  const renderTextCard = (content: string) => {
    const charsCount = content.length;
    const nonImageContainerClassName = classnames(
      "block-flashcard__center brand--linkColor",
      {
        "block-flashcard__center--long block-flashcard__center--long--back block-flashcard__center--overflow":
          charsCount > 50
      }
    );
    return (
      <div className="block-flashcard__content">
        <div
          className={nonImageContainerClassName}
          aria-label={`Flashcard back - ${content}`}
        >
          <div
            aria-hidden="false"
            className="block-flashcard__description brand--head brand--linkColor"
          >
            <div className="fr-view">{content}</div>
          </div>
        </div>
      </div>
    );
  };
  const renderImageCard = (url: string) => {
    return (
      <div
        className="block-flashcard__content"
        style={{
          backgroundImage: `url(${url})`
        }}
      >
        <div
          className="block-flashcard__center brand--linkColor"
          aria-label="Flashcard back"
        ></div>
      </div>
    );
  };

  const renderButton = () => (
    <button className="block-flashcard__flip brand--ui" tabIndex={-1}>
      <span className="flip-text"></span>
      <span className="flip-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="17"
          viewBox="0 0 23 17"
          focusable="false"
        >
          <path
            fillRule="nonzero"
            d="M19.347 8.275l1.88 1.714a.727.727 0 0 0 .98-1.074l-3.225-2.941a.727.727 0 0 0-1.027.047l-2.94 3.224a.727.727 0 0 0 1.075.98l1.802-1.976a6.545 6.545 0 0 1-11.56 4.288.727.727 0 1 0-1.114.935 8 8 0 0 0 14.129-5.197zm-16.039.162l-1.79-1.633a.727.727 0 1 0-.98 1.074l3.223 2.94c.297.272.757.25 1.028-.046l2.94-3.224a.727.727 0 0 0-1.075-.98L4.768 8.636a6.545 6.545 0 0 1 11.555-4.482.727.727 0 1 0 1.114-.936A8 8 0 0 0 3.308 8.437z"
          ></path>
        </svg>
      </span>
    </button>
  );

  const renderBackCard = (blockId: number, type: string, content: string) => {
    const isImageType = type === "image";
    const containerClassName = classnames(
      "block-flashcard__back block-flashcard--flipped",
      {
        "block-flashcard__back--fullimage": isImageType
      }
    );

    return (
      <div
        data-testid="card-back"
        onClick={(e) => handleClick(e, blockId)}
        aria-hidden="false"
        className={containerClassName}
        role="button"
        tabIndex={0}
      >
        {isImageType && renderImageCard(content)}
        {!isImageType && renderTextCard(content)}
        {renderButton()}
      </div>
    );
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} containerStyle={containerStyle}>
      {renderFrontCard(data.id, data.front.content)}
      {renderBackCard(data.id, data.back.type, data.back.content)}
    </ReactCardFlip>
  );
};

interface CardComponent {
  data: CardType;
  onFlip: Function;
}
