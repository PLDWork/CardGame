import { useEffect, useState } from "react";
import ECard from "./ECard";
import DeckList from "./DeckList";

function EnemiesArea(props) {
  const [slot1Killable, setSlot1Killable] = useState(false);
  const [slot2Killable, setSlot2Killable] = useState(false);
  const [slot3Killable, setSlot3Killable] = useState(false);
  const [slot4Killable, setSlot4Killable] = useState(false);
  const [slot5Killable, setSlot5Killable] = useState(false);

  useEffect(() => {
    setSlot1Killable(!isEmpty(props.field[0]) && props.field[0].icons.health + props.field[0].icons.bonusHP <= props.playerAttack ? true : false);
    setSlot2Killable(!isEmpty(props.field[1]) && props.field[1].icons.health + props.field[1].icons.bonusHP <= props.playerAttack ? true : false);
    setSlot3Killable(!isEmpty(props.field[2]) && props.field[2].icons.health + props.field[2].icons.bonusHP <= props.playerAttack ? true : false);
    setSlot4Killable(!isEmpty(props.field[3]) && props.field[3].icons.health + props.field[3].icons.bonusHP <= props.playerAttack ? true : false);
    setSlot5Killable(!isEmpty(props.field[4]) && props.field[4].icons.health + props.field[4].icons.bonusHP <= props.playerAttack ? true : false);
  }, [props.playerAttack]);

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  function attackEnemy(id) {
    props.attack(id);
  }

  return (
    <>
      <div className="enemy-area">
        {props.showRules && (
          <div className="rules">
            <h2>This is the enemy area.</h2>
            <h3>Win the game by defeating every enemy!</h3>
            <p>When the turn ends, every enemy moves one space to the right. You lose if there is an enemy on space 5 when you end the turn.</p>
          </div>
        )}
        <p className="area-name">Enemy</p>
        <div className="row">
          <div className="enemy-info">
            <p>Deck</p>
            <p>{props.deck.length} cards</p>
          </div>
          <div className="card-area">
            {isEmpty(props.field[0]) ? (
              <div id="slot-1" className="enemy-slot">
                1
              </div>
            ) : (
              <ECard
                key={props.field[0].id}
                id={props.field[0].id}
                name={props.field[0].name}
                text={props.field[0].text}
                icons={props.field[0].icons}
                killable={slot1Killable}
                attack={attackEnemy}
                disableClicks={props.disableClicks}
              />
            )}
            {isEmpty(props.field[1]) ? (
              <div id="slot-2" className="enemy-slot">
                2
              </div>
            ) : (
              <ECard
                key={props.field[1].id}
                id={props.field[1].id}
                name={props.field[1].name}
                text={props.field[1].text}
                icons={props.field[1].icons}
                killable={slot2Killable}
                attack={attackEnemy}
                disableClicks={props.disableClicks}
              />
            )}
            {isEmpty(props.field[2]) ? (
              <div id="slot-3" className="enemy-slot">
                3
              </div>
            ) : (
              <ECard
                key={props.field[2].id}
                id={props.field[2].id}
                name={props.field[2].name}
                text={props.field[2].text}
                icons={props.field[2].icons}
                killable={slot3Killable}
                attack={attackEnemy}
                disableClicks={props.disableClicks}
              />
            )}
            {isEmpty(props.field[3]) ? (
              <div id="slot-4" className="enemy-slot">
                4
              </div>
            ) : (
              <ECard
                key={props.field[3].id}
                id={props.field[3].id}
                name={props.field[3].name}
                text={props.field[3].text}
                icons={props.field[3].icons}
                killable={slot4Killable}
                attack={attackEnemy}
                disableClicks={props.disableClicks}
              />
            )}
            {isEmpty(props.field[4]) ? (
              <div id="slot-5" className="enemy-slot">
                5
              </div>
            ) : (
              <ECard
                key={props.field[4].id}
                id={props.field[4].id}
                name={props.field[4].name}
                text={props.field[4].text}
                icons={props.field[4].icons}
                killable={slot5Killable}
                attack={attackEnemy}
                disableClicks={props.disableClicks}
              />
            )}
          </div>
          <div className="enemy-info">
            <p>Discard</p>
            <p>{props.discard.length} cards</p>
          </div>
        </div>
      </div>
      {props.showDeck && (
        <details>
          <summary className="show-deck-summary">Show enemy deck</summary>
          <div className="deck-list">
            <DeckList deck={props.deck} />
          </div>
        </details>
      )}
    </>
  );
}

export default EnemiesArea;
