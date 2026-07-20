import { useRef, useState } from "react";
import PCard from "./PCard";
import DeckList from "./DeckList";

function PlayerArea(props) {
  const [isDeckHidden, setDeckHidden] = useState(true);
  const [buttonText, setButtonText] = useState("Show");
  const [playAnimationVisible, setPlayAnimationVisible] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  const cardRefs = useRef([]);

  function toggleDeckVisibility() {
    setButtonText(isDeckHidden ? "Hide" : "Show");
    setDeckHidden(!isDeckHidden);
  }

  function handleDraw() {
    props.drawCard(1);
  }

  function showAnimation() {
    setPlayAnimationVisible(true);
    setAnimationActive(true);
  }

  function onAnimationEnd() {
    setPlayAnimationVisible(false);
    setAnimationActive(false);
  }

  function playCard(id) {
    const element = cardRefs.current[id];
    console.log(element);
    if (element) {
      const rect = element.getBoundingClientRect();
      console.log(rect);
    }

    showAnimation();
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
              <button className="player-button" onClick={toggleDeckVisibility}>
                {buttonText}
              </button>
              <button className="player-button" onClick={playAllCards}>
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
                  return <PCard key={card.id} ref={(el) => (cardRefs.current[card.id] = el)} id={card.id} name={card.name} text={card.text} icons={card.icons} location="player" playCard={playCard} />;
                })}
              </div>
            </div>
            <div className="player-info">
              <p>Discard</p>
              <p>{props.discardLength} cards</p>
              <button className="player-button" onClick={handleEndTurn}>
                End Turn
              </button>
            </div>
          </div>
          {props.messageInfo.show && (
            <div className="message">
              <p className="message-text">{props.messageInfo.message}</p>
            </div>
          )}
          <div
            className={"card-animation" + (playAnimationVisible ? " play-card-animation" : "") + (animationActive ? " show-card-animation" : "hide-card-animation")}
            onAnimationEnd={onAnimationEnd}
          ></div>
        </div>
      </div>
      {!isDeckHidden && (
        <div className="deck-list">
          <DeckList deck={props.deck} />
        </div>
      )}
    </>
  );
}

export default PlayerArea;
