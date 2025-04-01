export const categories = [
  {
    name: "Пиццы",
  },
  {
    name: "Завтрак",
  },
  {
    name: "Закуски",
  },
  {
    name: "Коктейли",
  },
  {
    name: "Напитки",
  },
];

export const ingredients = [
  {
    name: "Сырный бортик",
    price: 40,
    imageUrl:
      "/assets/images/ingredients/1.png",
  },
  {
    name: "Сливочная моцарелла",
    price: 23,
    imageUrl:
      "/assets/images/ingredients/2.png",
  },
  {
    name: "Сыры чеддер и пармезан",
    price: 23,
    imageUrl:
      "/assets/images/ingredients/3.png",
  },
  {
    name: "Острый перец халапеньо",
    price: 15,
    imageUrl:
      "/assets/images/ingredients/4.png",
  },
  {
    name: "Нежный цыпленок",
    price: 23,
    imageUrl:
      "/assets/images/ingredients/5.png",
  },
  {
    name: "Шампиньоны",
    price: 16,
    imageUrl:
      "/assets/images/ingredients/6.png",
  },
  {
    name: "Ветчина",
    price: 23,
    imageUrl:
      "/assets/images/ingredients/7.png",
  },
  {
    name: "Пикантная пепперони",
    price: 23,
    imageUrl:
      "/assets/images/ingredients/8.png",
  },
  {
    name: "Острая чоризо",
    price: 23,
    imageUrl:
      "/assets/images/ingredients/9.png",
  },
  {
    name: "Маринованные огурчики",
    price: 13,
    imageUrl:
      "/assets/images/ingredients/10.png",
  },
  {
    name: "Свежие томаты",
    price: 13,
    imageUrl:
      "/assets/images/ingredients/11.png",
  },
  {
    name: "Красный лук",
    price: 13,
    imageUrl:
      "/assets/images/ingredients/12.png",
  },
  {
    name: "Сочные ананасы",
    price: 12,
    imageUrl:
      "/assets/images/ingredients/13.png",
  },
  {
    name: "Итальянские травы",
    price: 10,
    imageUrl:
      "/assets/images/ingredients/14.png",
  },
  {
    name: "Сладкий перец",
    price: 15,
    imageUrl:
      "/assets/images/ingredients/15.png",
  },
  {
    name: "Кубики брынзы",
    price: 23,
    imageUrl:
      "/assets/images/ingredients/16.png",
  },
  {
    name: "Митболы",
    price: 23,
    imageUrl:
      "/assets/images/ingredients/17.png",
  },
].map((obj, index) => ({ ingredientId: index + 1, ...obj }));

export const products = [
  {
    name: "Омлет с ветчиной и грибами",
    imageUrl:
      "/assets/images/products/1.webp",
    categoryRef: 2,
  },
  {
    name: "Омлет с пепперони",
    imageUrl:
      "/assets/images/products/2.webp",
    categoryRef: 2,
  },
  {
    name: "Кофе Латте",
    imageUrl:
      "/assets/images/products/3.webp",
    categoryRef: 2,
  },
  {
    name: "Дэнвич ветчина и сыр",
    imageUrl:
      "/assets/images/products/4.webp",
    categoryRef: 3,
  },
  {
    name: "Куриные наггетсы",
    imageUrl:
      "/assets/images/products/5.webp",
    categoryRef: 3,
  },
  {
    name: "Картофель из печи с соусом 🌱",
    imageUrl:
      "/assets/images/products/6.webp",
    categoryRef: 3,
  },
  {
    name: "Кебаб",
    imageUrl:
      "/assets/images/products/7.webp",
    categoryRef: 3,
  },
  {
    name: "Острый кебаб 🌶️🌶️",
    imageUrl:
      "/assets/images/products/8.webp",
    categoryRef: 3,
  },
  {
    name: "Банановый молочный коктейль",
    imageUrl:
      "/assets/images/products/9.webp",
    categoryRef: 4,
  },
  {
    name: "Карамельное яблоко молочный коктейль",
    imageUrl:
      "/assets/images/products/10.webp",
    categoryRef: 4,
  },
  {
    name: "Молочный коктейль с печеньем Орео",
    imageUrl:
      "/assets/images/products/11.webp",
    categoryRef: 4,
  },
  {
    name: "Классический молочный коктейль 👶",
    imageUrl:
      "/assets/images/products/12.webp",
    categoryRef: 4,
  },
  {
    name: "Ирландский Капучино",
    imageUrl:
      "/assets/images/products/13.webp",
    categoryRef: 5,
  },
  {
    name: "Кофе Карамельный капучино",
    imageUrl:
      "/assets/images/products/14.webp",
    categoryRef: 5,
  },
  {
    name: "Кофе Кокосовый латте",
    imageUrl:
      "/assets/images/products/15.webp",
    categoryRef: 5,
  },
  {
    name: "Кофе Американо",
    imageUrl:
      "/assets/images/products/16.webp",
    categoryRef: 5,
  },
  {
    name: "Кофе Латте",
    imageUrl:
      "/assets/images/products/17.webp",
    categoryRef: 5,
  },
];
