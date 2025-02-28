import React, { JSX } from "react";

import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
} from "@/components/shared";

const items = [
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif",
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif",
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif",
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif",
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif",
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif",
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif",
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif",
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif",
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif",
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif",
    price: 550,
    items: [{ price: 550 }],
  },
  
];

export default function Home(): JSX.Element {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="my-14">
        <div className="flex gap-[110px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пиццы" items={items} categoryId={1} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
