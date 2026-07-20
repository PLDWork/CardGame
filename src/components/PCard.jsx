import React, { useState } from "react";
import "./card.css";

function PCard(props) {
  const [costDisplay, setCostDisplay] = useState(props.icons.cost === 0 ? "hidden" : "visible");
  const [attackDisplay, setAttackDisplay] = useState(props.icons.attack === 0 ? "hidden" : "visible");
  const [coinDisplay, setCoinDisplay] = useState(props.icons.coin === 0 ? "hidden" : "visible");

  function handleClick() {
    if (props.location === "player") {
      props.playCard(props.id);
    } else if (props.location === "shop") {
      props.addCard(props.id);
    }
  }

  return (
    <div className={`cards ${props.buyable && "buyable"}`} onClick={handleClick}>
      <div className="icon-row">
        <div className="row" style={{ visibility: attackDisplay }}>
          <p>{props.icons.attack}</p>
          <img className="images" src="icons/sword.svg" alt="attack" />
        </div>
        <div className="row" style={{ visibility: coinDisplay }}>
          <p>{props.icons.coin}</p>
          <img className="images" src="icons/coin.svg" alt="coin" />
        </div>
      </div>
      <div>
        <p className="card-name">{props.name}</p>
      </div>
      <div>
        <p className="card-text">{props.text}</p>
      </div>
      <p className="card-id">{props.id}</p>
      <div className="cost" style={{ visibility: costDisplay }}>
        <p className="cost-text">{props.icons.cost}</p>
      </div>
    </div>
  );
}

export default PCard;
