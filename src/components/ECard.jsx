import React, { useState } from "react";
import "./card.css";

function ECard(props) {
  const [hasBonusHP, setHadBonusHP] = useState(false);

  function handleClick() {
    props.attack(props.id);
  }

  return (
    <div className={`cards ${props.killable && "killable"}`} onClick={handleClick}>
      <div>
        <p className="card-name">{props.name}</p>
      </div>
      <div>
        <p className="card-text">{props.text}</p>
      </div>
      <div className="icon-row">
        <div className="row">
          <p className={`${props.icons.bonusHP > 0 && "bonus-HP"}`}>{props.icons.health + props.icons.bonusHP}</p>
          <img className="images" src="icons/heart.svg" alt="health" />
        </div>
      </div>
      <p className="card-id">{props.id}</p>
    </div>
  );
}

export default ECard;
