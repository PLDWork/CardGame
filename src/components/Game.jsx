import { useRef, useState } from "react";
import basicCards, { playerStartingDeck, shopDeck1 } from "../player-cards";
import enemiesCardList1, { enemiesDeck1T1, enemiesDeck1T2, enemiesDeck1T3, enemiesDeck1T4 } from "../enemies-cards";
import EnemiesArea from "./EnemiesArea";
import ShopArea from "./ShopArea";
import PlayerArea from "./PlayerArea";
import GameLog from "./GameLog";

function App() {
  const [hideStartButton, setHideStartButton] = useState(false);
  const [messageInfoState, setMessageInfoState] = useState({ show: false, message: "Game in progess" });
  const [gameRunningState, setGameRunning] = useState(false);
  const [disableGameButtonsState, setDisableGameButtons] = useState(true);
  const [disableStartButtonsState, setDisableStartButtons] = useState(false);
  const [showRulesState, setShowRules] = useState(false);
  const [showDecksState, setShowDecks] = useState(false);
  const [showMenuState, setShowMenu] = useState(false);

  const [playerDeckState, setPlayerDeck] = useState([]);
  const [playerHandState, setPlayerHand] = useState([]);
  const [playAreaState, setPlayArea] = useState([]);
  const [playerDiscardState, setPlayerDiscard] = useState([]);
  const [playerCoinState, setCoin] = useState(0);
  const [playerAttackState, setAttack] = useState(0);
  const [enemiesDeckState, setEnemiesDeck] = useState([]);
  const [enemiesFieldState, setEnemiesField] = useState([{}, {}, {}, {}, {}]);
  const [enemiesDiscardState, setEnemesDiscard] = useState([]);
  const [shopDeckState, setShopDeck] = useState([]);
  const [shopConstantState, setShopConstant] = useState([[{}], [{}]]);
  const [shopRowState, setShopRow] = useState([{}, {}, {}, {}, {}]);
  const [shopDiscardState, setShopDiscard] = useState([]);
  const [logContentState, setLogContentState] = useState([]);

  const turnCountRef = useRef(1);

  let playerDeck = [...playerDeckState];
  let playerHand = [...playerHandState];
  let playArea = [...playAreaState];
  let playerDiscard = [...playerDiscardState];
  let playerCoin = playerCoinState;
  let playerAttack = playerAttackState;
  let enemiesDeck = [...enemiesDeckState];
  let enemiesField = [...enemiesFieldState];
  let enemiesDiscard = [...enemiesDiscardState];
  let shopDeck = [...shopDeckState];
  let shopConstant = [...shopConstantState];
  let shopRow = [...shopRowState];
  let shopDiscard = [...shopDiscardState];
  let reRenderPlayer = false;
  let reRenderShop = false;
  let reRenderEnemies = false;
  let logContent = [...logContentState];

  let nextId = 0;
  let nextEnemiesId = 0;

  function getNextId() {
    nextId++;
    return nextId;
  }

  function getNextEnemyId() {
    nextEnemiesId++;
    return nextEnemiesId;
  }

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  function isArrayOfEmptyObject(arr) {
    let isEmpy = true;
    arr.forEach((element) => {
      if (!isEmpty(element)) {
        isEmpy = false;
        return;
      }
    });

    return isEmpy;
  }

  function getCardById(deck, id) {
    const newCard = deck.find((card) => card.cardId === id);
    if (newCard !== undefined) {
      return newCard;
    } else {
      console.log("Failed to find card with id:");
      console.log(id);
    }
  }

  function gameLog(line) {
    logContent = [...logContent, line];
    setLogContentState(logContent);
  }

  function shuffle(array) {
    let shuffled = [...array];
    let currentIndex = shuffled.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }

    return shuffled;
  }

  function showInfo() {
    setShowRules(!showRulesState);
  }

  function toggleMenu() {
    if (showMenuState) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    setShowMenu(true);
    setDisableGameButtons(true);
    setDisableStartButtons(true);
  }

  function closeMenu() {
    setShowMenu(false);
    setDisableGameButtons(!gameRunningState);
    setDisableStartButtons(false);
  }

  function showDecks(e) {
    setShowDecks(e.target.checked);
  }

  function stopGame(new_message) {
    setMessageInfoState({ show: true, message: new_message });
    setDisableGameButtons(true);
    setGameRunning(false);
  }

  function startGame() {
    setHideStartButton(true);
    setDisableGameButtons(false);
    setGameRunning(true);
    gameLog("Game starting...");
    const newStartGameLog = "Turn " + turnCountRef.current;
    gameLog(newStartGameLog);

    //#region Player area
    console.log("Creating player starting deck...");
    playerStartingDeck.forEach((card) => {
      for (var i = 0; i < card.amount; i++) {
        playerDeck.push({ id: getNextId(), ...getCardById(basicCards, card.cardId) });
      }
    });

    playerDeck = shuffle(playerDeck);
    drawPlayerCard(5);
    reRenderPlayer = true;
    //#endregion
    //#region Enemy Area
    console.log("Creating enemies deck...");
    let t1 = [];
    let t2 = [];
    let t3 = [];
    let t4 = [];

    enemiesDeck1T1.forEach((card) => {
      for (var i = 0; i < card.amount; i++) {
        t1.push({ id: getNextEnemyId(), ...getCardById(enemiesCardList1, card.cardId) });
      }
    });
    t1 = shuffle(t1);

    enemiesDeck1T2.forEach((card) => {
      for (var i = 0; i < card.amount; i++) {
        t2.push({ id: getNextEnemyId(), ...getCardById(enemiesCardList1, card.cardId) });
      }
    });
    t2 = shuffle(t2);

    enemiesDeck1T3.forEach((card) => {
      for (var i = 0; i < card.amount; i++) {
        t3.push({ id: getNextEnemyId(), ...getCardById(enemiesCardList1, card.cardId) });
      }
    });
    t3 = shuffle(t3);

    enemiesDeck1T4.forEach((card) => {
      for (var i = 0; i < card.amount; i++) {
        t4.push({ id: getNextEnemyId(), ...getCardById(enemiesCardList1, card.cardId) });
      }
    });
    t4 = shuffle(t4);

    enemiesDeck = [...t4, ...t3, ...t2, ...t1];

    if (enemiesDeck.length > 0) {
      let firstEnemy = enemiesDeck.pop();
      enemiesField = [firstEnemy, {}, {}, {}, {}];
    } else {
      console.log("No ennemy cards left to draw");
    }

    reRenderEnemies = true;
    //#endregion
    //#region Shop area
    console.log("Creating shop deck...");
    let mediumAttack = [];
    let mediumTraining = [];

    for (let i = 1; i <= 10; i++) {
      mediumAttack.push({ id: getNextId(), ...getCardById(basicCards, 3) });
      mediumTraining.push({ id: getNextId(), ...getCardById(basicCards, 4) });
    }

    shopConstant = [mediumAttack, mediumTraining];

    shopDeck1.forEach((card) => {
      for (var i = 0; i < card.amount; i++) {
        shopDeck.push({ id: getNextId(), ...card });
      }
    });

    shopDeck = shuffle(shopDeck);

    shopRow.forEach((spot, index) => {
      if (shopDeck.length > 0) {
        shopRow[index] = shopDeck.pop();
      } else {
        console.log("No shop cards left to draw");
      }
    });

    reRenderShop = true;
    //#endregion

    reRender();
  }

  //#region Card Moving
  function addCardToPlayerDiscard(cardId) {
    let newCard;
    if (shopRow.find((card) => card.id === cardId) !== undefined) {
      newCard = shopRow.find((card) => card.id === cardId);
    } else if (shopConstant[0].find((card) => card.id === cardId) !== undefined) {
      newCard = shopConstant[0].find((card) => card.id === cardId);
    } else if (shopConstant[1].find((card) => card.id === cardId) !== undefined) {
      newCard = shopConstant[1].find((card) => card.id === cardId);
    }

    if (newCard.icons.cost <= playerCoin) {
      if (newCard.cardId === 3) {
        shopConstant[0].shift();
      } else if (newCard.cardId === 4) {
        shopConstant[1].shift();
      } else {
        const slotIndex = shopRow.findIndex((card) => {
          return card.id === cardId;
        });

        if (shopDeck.length > 0) {
          shopRow[slotIndex] = {};
        }
      }

      playerDiscard.push(newCard);
      playerCoin -= newCard.icons.cost;
      const newBuyCardLog = "Buys: [" + newCard.name + "] id: " + newCard.id;
      gameLog(newBuyCardLog);
      reRenderPlayer = true;
      reRenderShop = true;
      reRender();
    } else {
      console.log("Not enough coins");
    }
  }

  function manualDraw(count) {
    drawPlayerCard(count);
    reRender();
  }

  function drawPlayerCard(count) {
    let newCards = [];
    let newCard;

    while (count > 0) {
      if (playerDeck.length === 0) {
        playerDeck = shuffle(playerDiscard);
        playerDiscard = [];
      }

      if (playerDeck.length > 0) {
        newCard = playerDeck.pop();
        playerHand.push(newCard);
        newCards = [...newCards, newCard];
      } else {
        console.log("No cards left to draw");
        break;
      }
      count--;
    }

    let addComma = false;
    let newDrawLog = "Draws ";
    newCards.forEach((card) => {
      if (addComma) {
        newDrawLog += ", [" + card.name + "] id: " + card.id;
      } else {
        newDrawLog += "[" + card.name + "] id: " + card.id;
        addComma = true;
      }
    });
    gameLog(newDrawLog);
    reRenderPlayer = true;
  }

  function discardPlayerCard(func, arg) {
    if (playerHand.length > 0) {
      const discardedCard = playerHand[Math.floor(Math.random() * playerHand.length)];
      playerHand = playerHand.filter((card) => {
        return card.id !== discardedCard.id;
      });

      playerDiscard.push(discardedCard);
      let newDiscardLog = "Discards: " + discardedCard.name + " id: " + discardedCard.id;
      gameLog(newDiscardLog);
      abilityList[func]?.(arg);

      reRenderPlayer = true;
    } else {
      console.log("Error discarding card");
    }
  }

  function playPlayerCard(cardId) {
    const playedCard = playerHand.find((card) => card.id === cardId);
    playerAttack += playedCard.icons.attack;
    playerCoin += playedCard.icons.coin;

    playerHand = playerHand.filter((card) => {
      return card.id !== cardId;
    });

    const newPlayCardLog = "Plays: [" + playedCard.name + "] id: " + playedCard.id;
    gameLog(newPlayCardLog);

    playedCard.abilities.forEach((ability) => {
      abilityList[ability.function]?.(...ability.arg);
    });

    playArea.push(playedCard);
    reRenderPlayer = true;
    reRender();
  }

  function playAllPlayerCard() {
    while (!isEmpty(playerHand)) {
      playPlayerCard(playerHand[0].id);
    }
  }
  //#endregion

  //#region Abilities
  const abilityList = {
    drawCard: (count) => {
      drawPlayerCard(count);
      reRender();
    },
    discardCard: (func, arg) => {
      discardPlayerCard(func, arg);
      reRender();
    },
    addAttack: (arg) => {
      addAttack(arg);
      reRender();
    },
    checkForArmor: (func, arg) => {
      checkForArmor(func, arg);
      reRender();
    },
  };

  const enemyAbilityList = {
    flagBuff: (index) => {
      flagBuff(index);
      reRender();
    },
  };
  function addAttack(amount) {
    playerAttack += parseInt(amount);
  }

  function checkForArmor(func, arg) {
    if (playArea.find((card) => card.attributes.find((attr) => attr === "armor")) !== undefined) {
      abilityList[func]?.(arg);
    } else {
      console.log("No armor in play area");
    }
  }

  function flagBuff(index) {
    if (index > 0) {
      if (!isEmpty(enemiesField[index - 1])) {
        enemiesField[index - 1].icons.bonusHP += 1;
      }
    }

    if (index < 4) {
      if (!isEmpty(enemiesField[index + 1])) {
        enemiesField[index + 1].icons.bonusHP += 1;
      }
    }
  }

  function applyEnemyAbilities() {
    for (let i = enemiesField.length - 1; i >= 0; i--) {
      if (!isEmpty(enemiesField[i])) {
        enemiesField[i].abilities.forEach((ability) => {
          enemyAbilityList[ability]?.(i);
        });
      }
    }
  }
  //#endregion

  function attackEnemy(cardId) {
    const slotIndex = enemiesField.findIndex((card) => card.id === cardId);
    const enemy = slotIndex !== -1 ? enemiesField[slotIndex] : undefined;

    if (enemy !== undefined && enemy.icons.health + enemy.icons.bonusHP <= playerAttack) {
      enemiesField[slotIndex] = {};
      playerAttack -= enemy.icons.health + enemy.icons.bonusHP;
      resetBonusHP();
      applyEnemyAbilities();
      const newDefeatLog = "Defeated: " + enemy.name + " id: " + enemy.id;
      gameLog(newDefeatLog);
      reRenderEnemies = true;
      reRenderPlayer = true;
    } else {
      console.log("Not enough attack");
    }

    if (enemiesDeck.length === 0 && isArrayOfEmptyObject(enemiesField)) {
      stopGame("You Win!");
      console.log("You win!");
      const newWinLog = "You Win!";
      gameLog(newWinLog);
    }

    reRender();
  }
  //#region End of Turn
  function resetBonusHP() {
    enemiesField.forEach((enemy) => {
      if (!isEmpty(enemy)) {
        enemy.icons.bonusHP = 0;
      }
    });
  }

  function advanceEnemies() {
    if (!isEmpty(enemiesField[4])) {
      stopGame("You Lose...");
      console.log("You lose");
      return;
    }

    resetBonusHP();

    for (let i = enemiesField.length - 1; i > 0; i--) {
      enemiesField[i] = structuredClone(enemiesField[i - 1]);
    }

    let newEnemy = enemiesDeck.pop();
    enemiesField[0] = !isEmpty(newEnemy) ? newEnemy : {};

    applyEnemyAbilities();

    reRenderEnemies = true;
  }

  function resetPlayerArea() {
    playerDiscard = [...playerDiscard, ...playArea, ...playerHand];
    playerHand = [];
    playArea = [];
    playerAttack = 0;
    playerCoin = 0;

    drawPlayerCard(5);
    reRenderPlayer = true;
  }

  function refillShop() {
    for (let i = shopRow.length - 1; i >= 0; i--) {
      if (isEmpty(shopRow[i])) {
        if (shopDeck.length > 0) {
          shopRow[i] = shopDeck.pop();
          reRenderShop = true;
        } else {
          console.log("No shop cards left to draw");
        }
      }
    }
  }

  function handleEndTurn() {
    turnCountRef.current += 1;
    const newLog = "Turn " + turnCountRef.current;
    gameLog(newLog);
    advanceEnemies();
    resetPlayerArea();
    refillShop();
    reRender();
  }
  //#endregion

  function reRender() {
    if (reRenderPlayer) {
      setPlayerDeck(playerDeck);
      setPlayerHand(playerHand);
      setPlayArea(playArea);
      setPlayerDiscard(playerDiscard);
      setCoin(playerCoin);
      setAttack(playerAttack);
    }

    if (reRenderEnemies) {
      setEnemiesDeck(enemiesDeck);
      setEnemiesField(enemiesField);
      setEnemesDiscard(enemiesDiscard);
    }

    if (reRenderShop) {
      setShopDeck(shopDeck);
      setShopConstant(shopConstant);
      setShopRow(shopRow);
      setShopDiscard(shopDiscard);
    }
  }

  return (
    <div>
      <div className="title-bar">
        <div className="game-name-area">
          <h1 className="game-name">Card Game</h1>
        </div>
        <div className="start-button-area flex-center">
          {!hideStartButton && (
            <button className="start-button" disabled={disableStartButtonsState} onClick={startGame}>
              Start Game
            </button>
          )}
        </div>
        <div className="title-button-row">
          <button className="info-button" onClick={showInfo}>
            i
          </button>
          <button className="info-button" onClick={toggleMenu}>
            S
          </button>
        </div>
      </div>
      <div className="game-area">
        {showMenuState && (
          <div className="menu">
            <div className="align-r">
              <button className="button-rec" onClick={closeMenu}>
                X
              </button>
            </div>
            <div>
              <label>Show decks</label>
              <input className="menu-button" type="checkbox" name="showDecks" checked={showDecksState} onChange={showDecks} />
            </div>
          </div>
        )}
        <EnemiesArea
          deck={enemiesDeckState}
          field={enemiesFieldState}
          discard={enemiesDiscardState}
          playerAttack={playerAttackState}
          disableClicks={disableGameButtonsState}
          showRules={showRulesState}
          showDeck={showDecksState}
          attack={attackEnemy}
        />
        <ShopArea
          constant={shopConstantState}
          deck={shopDeckState}
          row={shopRowState}
          discard={shopDiscardState}
          playerCoin={playerCoinState}
          disableClicks={disableGameButtonsState}
          showRules={showRulesState}
          showDeck={showDecksState}
          addCard={addCardToPlayerDiscard}
        />
        <PlayerArea
          deck={playerDeckState}
          hand={playerHandState}
          playArea={playAreaState}
          discardLength={playerDiscardState.length}
          coin={playerCoinState}
          attack={playerAttackState}
          messageInfo={messageInfoState}
          disableClicks={disableGameButtonsState}
          showRules={showRulesState}
          showDeck={showDecksState}
          drawCard={manualDraw}
          endTurn={handleEndTurn}
          playCard={playPlayerCard}
          playAll={playAllPlayerCard}
        />
      </div>
      <GameLog content={logContentState} />
    </div>
  );
}

export default App;
