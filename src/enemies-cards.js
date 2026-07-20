// const enemiesDeck1T1 = [
//   {
//     cardId: 1,
//     amount: 1,
//   },
//   {
//     cardId: 3,
//     amount: 3,
//   },
// ];

const enemiesDeck1T1 = [
  {
    cardId: 1,
    amount: 3,
  },
  {
    cardId: 2,
    amount: 1,
  },
];

const enemiesDeck1T2 = [
  {
    cardId: 1,
    amount: 2,
  },
  {
    cardId: 2,
    amount: 3,
  },
  {
    cardId: 3,
    amount: 1,
  },
];

const enemiesDeck1T3 = [
  {
    cardId: 3,
    amount: 2,
  },
  {
    cardId: 4,
    amount: 3,
  },
  {
    cardId: 5,
    amount: 3,
  },
];

const enemiesDeck1T4 = [
  {
    cardId: 6,
    amount: 4,
  },
];

const enemiesCardList1 = [
  {
    cardId: 1,
    name: "Goblin scout",
    icons: {
      health: 2,
      bonusHP: 0,
    },
    text: "",
    abilities: [],
  },
  {
    cardId: 2,
    name: "Goblin fighter",
    icons: {
      health: 3,
      bonusHP: 0,
    },
    text: "",
    abilities: [],
  },
  {
    cardId: 3,
    name: "Flag Carrier",
    icons: {
      health: 2,
      bonusHP: 0,
    },
    text: "+1 HP to adjacent enemies",
    abilities: ["flagBuff"],
  },
  {
    cardId: 4,
    name: "Orc",
    icons: {
      health: 4,
      bonusHP: 0,
    },
    text: "",
    abilities: [],
  },
  {
    cardId: 5,
    name: "Orc Bruiser",
    icons: {
      health: 5,
      bonusHP: 0,
    },
    text: "",
    abilities: [],
  },
  {
    cardId: 6,
    name: "Orc Boss",
    icons: {
      health: 8,
      bonusHP: 0,
    },
    text: "",
    abilities: [],
  },
];

export default enemiesCardList1;
export { enemiesDeck1T1, enemiesDeck1T2, enemiesDeck1T3, enemiesDeck1T4 };
