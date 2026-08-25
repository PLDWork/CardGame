import { useRef, useState } from "react";
import PCard from "./PCard";
import DeckList from "./DeckList";

function PlayerArea(props) {
  const cardRefs = useRef([]);

  function handleDraw() {
    props.drawCard(1);
  }

  function playCard(id) {
    const element = cardRefs.current[id];
    console.log(element);
    if (element) {
      const rect = element.getBoundingClientRect();
      console.log(rect);
    }

    props.playCard(id);
  }

  function playAllCards() {
    props.playAll();
  }

  function handleEndTurn() {
    props.endTurn();
  }

  return (
    <>
      <div>
        <div className="player-area">
          {props.showRules && (
            <div className="rules">
              <h2>This is the player area.</h2>
              <p>
                Each turn, you can play all your cards in the order that you choose. Using the Play All button will play all your cards from left to right. When you end the turn, all cards played and
                remaining in your hand will be discarded and your will draw 5 new cards. If you have to draw a card and your deck is empty, your discard pile is shuffle to make a new deck.
              </p>
            </div>
          )}
          <div className="player-top">
            <p className="area-name">Player</p>
            <div className="icons">
              <div className="icon-pair">
                <p>{props.coin}</p>
                <img className="player-images" src="icons/coin.svg" alt="coin" />
              </div>
              <div className="icon-pair">
                <p>{props.attack}</p>
                <img className="player-images" src="icons/sword.svg" alt="attack" />
              </div>
            </div>
          </div>
          <div className="player-body">
            <div className="player-info">
              <p>Deck</p>
              <p>{props.deck.length} cards</p>
              {/* <button className="player-button" disabled={props.disableClicks} onClick={handleDraw}>
                Draw
              </button> */}
              <button className="player-button" disabled={props.disableClicks} onClick={playAllCards}>
                Play All
              </button>
            </div>
            <div className="player-center">
              <div className="card-area">
                {props.playArea.map((card) => {
                  return <PCard key={card.id} id={card.id} name={card.name} text={card.text} icons={card.icons} location="player" />;
                })}
              </div>
              <div className="card-area">
                {props.hand.map((card, index) => {
                  return (
                    <PCard
                      key={card.id}
                      ref={(el) => (cardRefs.current[card.id] = el)}
                      id={card.id}
                      name={card.name}
                      text={card.text}
                      icons={card.icons}
                      location="player"
                      playCard={playCard}
                      disableClicks={props.disableClicks}
                    />
                  );
                })}
              </div>
            </div>
            <div className="player-info">
              <p>Discard</p>
              <p>{props.discardLength} cards</p>
              <button className="player-button" disabled={props.disableClicks} onClick={handleEndTurn}>
                End Turn
              </button>
            </div>
          </div>
          {props.messageInfo.show && (
            <div className="message">
              <p className="message-text">{props.messageInfo.message}</p>
            </div>
          )}
        </div>
      </div>
      {props.showDeck && (
        <details>
          <summary className="show-deck-summary">Show player deck</summary>
          <div className="deck-list">
            <DeckList deck={props.deck} />
          </div>
        </details>
      )}
    </>
  );
}

export default PlayerArea;
