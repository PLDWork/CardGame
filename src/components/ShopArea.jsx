import { useEffect, useState } from "react";
import PCard from "./PCard";
import DeckList from "./DeckList";

function ShopArea(props) {
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
        {props.showRules && (
          <div className="rules">
            <h2>This is the shop area.</h2>
            <p>Buy new cards with coin to make your deck stronger. Cards you buy to into your discard.</p>
          </div>
        )}
        <div style={{ display: "flex" }}>
          <p className="area-name">Shop</p>
        </div>
        <div className="row">
          <div className="shop-constant">
            {isEmpty(props.constant[0][0]) ? (
              <div id="slot-1" className="enemy-slot">
                S
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
                disableClicks={props.disableClicks}
              />
            )}
            {isEmpty(props.constant[1][0]) ? (
              <div id="slot-2" className="enemy-slot">
                S
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
                disableClicks={props.disableClicks}
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
                disableClicks={props.disableClicks}
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
                disableClicks={props.disableClicks}
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
                disableClicks={props.disableClicks}
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
                disableClicks={props.disableClicks}
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
                disableClicks={props.disableClicks}
              />
            )}
          </div>
        </div>
      </div>
      {props.showDeck && (
        <details>
          <summary className="show-deck-summary">Show show deck</summary>
          <div className="deck-list">
            <DeckList deck={props.deck} />
          </div>
        </details>
      )}
    </>
  );
}

export default ShopArea;
