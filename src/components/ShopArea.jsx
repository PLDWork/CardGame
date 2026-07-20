import { useEffect, useState } from "react";
import PCard from "./PCard";
import DeckList from "./DeckList";

function ShopArea(props) {
  const [isDeckHidden, setDeckHidden] = useState(true);
  const [deckDisplay, setDeckDisplay] = useState("none");
  const [buttonText, setButtonText] = useState("Show");
  const [constant1Buyable, setConstant1Buyable] = useState(false);
  const [constant2Buyable, setConstant2Buyable] = useState(false);
  const [slot1Buyable, setSlot1Buyable] = useState(false);
  const [slot2Buyable, setSlot2Buyable] = useState(false);
  const [slot3Buyable, setSlot3Buyable] = useState(false);
  const [slot4Buyable, setSlot4Buyable] = useState(false);
  const [slot5Buyable, setSlot5Buyable] = useState(false);

  useEffect(() => {
    setConstant1Buyable(!isEmpty(props.constant[0][0]) && props.constant[0][0].icons.cost <= props.playerCoin ? true : false);
    setConstant2Buyable(!isEmpty(props.constant[1][0]) && props.constant[1][0].icons.cost <= props.playerCoin ? true : false);
    setSlot1Buyable(!isEmpty(props.row[0]) && props.row[0].icons.cost <= props.playerCoin ? true : false);
    setSlot2Buyable(!isEmpty(props.row[1]) && props.row[1].icons.cost <= props.playerCoin ? true : false);
    setSlot3Buyable(!isEmpty(props.row[2]) && props.row[2].icons.cost <= props.playerCoin ? true : false);
    setSlot4Buyable(!isEmpty(props.row[3]) && props.row[3].icons.cost <= props.playerCoin ? true : false);
    setSlot5Buyable(!isEmpty(props.row[4]) && props.row[4].icons.cost <= props.playerCoin ? true : false);
  }, [props.playerCoin]);

  function toggleDeckVisibility() {
    setButtonText(isDeckHidden ? "Hide" : "Show");
    setDeckDisplay(isDeckHidden ? "Inline" : "None");
    setDeckHidden(!isDeckHidden);
  }

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  function addNewCard(id) {
    props.addCard(id);
  }

  return (
    <>
      <div className="shop-area">
        <div style={{ display: "flex" }}>
          <p className="area-name">Shop</p>
          <button className="player-button" onClick={toggleDeckVisibility}>
            {buttonText}
          </button>
        </div>
        <div className="row">
          <div className="shop-constant">
            {isEmpty(props.constant[0][0]) ? (
              <div id="slot-1" className="enemy-slot">
                1
              </div>
            ) : (
              <PCard
                key={props.constant[0][0].id}
                id={props.constant[0][0].id}
                name={props.constant[0][0].name}
                text={props.constant[0][0].text}
                icons={props.constant[0][0].icons}
                location="shop"
                buyable={constant1Buyable}
                addCard={addNewCard}
              />
            )}
            {isEmpty(props.constant[1][0]) ? (
              <div id="slot-2" className="enemy-slot">
                1
              </div>
            ) : (
              <PCard
                key={props.constant[1][0].id}
                id={props.constant[1][0].id}
                name={props.constant[1][0].name}
                text={props.constant[1][0].text}
                icons={props.constant[1][0].icons}
                location="shop"
                buyable={constant2Buyable}
                addCard={addNewCard}
              />
            )}
          </div>
          <div className="card-area">
            {isEmpty(props.row[0]) ? (
              <div id="slot-1" className="enemy-slot">
                1
              </div>
            ) : (
              <PCard
                key={props.row[0].id}
                id={props.row[0].id}
                name={props.row[0].name}
                text={props.row[0].text}
                icons={props.row[0].icons}
                location="shop"
                buyable={slot1Buyable}
                addCard={addNewCard}
              />
            )}
            {isEmpty(props.row[1]) ? (
              <div id="slot-2" className="enemy-slot">
                2
              </div>
            ) : (
              <PCard
                key={props.row[1].id}
                id={props.row[1].id}
                name={props.row[1].name}
                text={props.row[1].text}
                icons={props.row[1].icons}
                location="shop"
                buyable={slot2Buyable}
                addCard={addNewCard}
              />
            )}
            {isEmpty(props.row[2]) ? (
              <div id="slot-3" className="enemy-slot">
                3
              </div>
            ) : (
              <PCard
                key={props.row[2].id}
                id={props.row[2].id}
                name={props.row[2].name}
                text={props.row[2].text}
                icons={props.row[2].icons}
                location="shop"
                buyable={slot3Buyable}
                addCard={addNewCard}
              />
            )}
            {isEmpty(props.row[3]) ? (
              <div id="slot-4" className="enemy-slot">
                4
              </div>
            ) : (
              <PCard
                key={props.row[3].id}
                id={props.row[3].id}
                name={props.row[3].name}
                text={props.row[3].text}
                icons={props.row[3].icons}
                location="shop"
                buyable={slot4Buyable}
                addCard={addNewCard}
              />
            )}
            {isEmpty(props.row[4]) ? (
              <div id="slot-5" className="enemy-slot">
                5
              </div>
            ) : (
              <PCard
                key={props.row[4].id}
                id={props.row[4].id}
                name={props.row[4].name}
                text={props.row[4].text}
                icons={props.row[4].icons}
                location="shop"
                buyable={slot5Buyable}
                addCard={addNewCard}
              />
            )}
          </div>
        </div>
      </div>
      <div style={{ display: deckDisplay }} className="deck-list">
        <DeckList deck={props.deck} />
      </div>
    </>
  );
}

export default ShopArea;
