import React from "react";
import "./deck-list.css";

function DeckList(props) {
  return (
    <div>
      {props.deck.map((card) => {
        return (
          <div key={card.id} className="deck-list">
            <p className="name">Name: {card.name}</p>
            <p className="ids">id = {card.id}</p>
            <p className="ids">CardId = {card.cardId}</p>
          </div>
        );
      })}
    </div>
  );
}

export default DeckList;
