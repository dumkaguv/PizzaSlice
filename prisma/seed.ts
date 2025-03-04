import { Prisma } from "@prisma/client";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productRef,
  pizzaType,
  size,
}: {
  productRef: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productRef,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as unknown as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  const init = async () => {
    await createUsers();
    await createCategories();
    await createIngredients();
    await createProducts();
    await createProductItems();
    await createCarts();
    await createCartItems();
  };

  const createUsers = async () => {
    await prisma.user.createMany({
      data: [
        {
          fullName: "User Test",
          email: "user@test.ru",
          password: hashSync("111111", 10),
          verifiedAt: new Date(),
          role: "USER",
        },
        {
          fullName: "Admin Admin",
          email: "admin@test.ru",
          password: hashSync("111111", 10),
          verifiedAt: new Date(),
          role: "ADMIN",
        },
      ],
    });
  };

  const createCategories = async () => {
    await prisma.category.createMany({ data: categories });
  };

  const createIngredients = async () => {
    await prisma.ingredient.createMany({ data: ingredients });
  };

  const createProducts = async () => {
    await prisma.product.createMany({ data: products });
  };

  const createProductItems = async () => {
    const pizza1 = await prisma.product.create({
      data: {
        name: "Пепперони фреш",
        imageUrl:
          "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
        categoryRef: 1,
        ingredients: {
          connect: ingredients.slice(0, 5),
        },
      },
    });

    const pizza2 = await prisma.product.create({
      data: {
        name: "Сырная",
        imageUrl:
          "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
        categoryRef: 1,
        ingredients: {
          connect: ingredients.slice(5, 10),
        },
      },
    });

    const pizza3 = await prisma.product.create({
      data: {
        name: "Чоризо фреш",
        imageUrl:
          "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
        categoryRef: 1,
        ingredients: {
          connect: ingredients.slice(10, 40),
        },
      },
    });

    await prisma.productItem.createMany({
      data: [
        // Пицца "Пепперони фреш"
        generateProductItem({
          productRef: pizza1.productId,
          pizzaType: 1,
          size: 20,
        }),
        generateProductItem({
          productRef: pizza1.productId,
          pizzaType: 2,
          size: 30,
        }),
        generateProductItem({
          productRef: pizza1.productId,
          pizzaType: 2,
          size: 40,
        }),

        // Пицца "Сырная"
        generateProductItem({
          productRef: pizza2.productId,
          pizzaType: 1,
          size: 20,
        }),
        generateProductItem({
          productRef: pizza2.productId,
          pizzaType: 1,
          size: 30,
        }),
        generateProductItem({
          productRef: pizza2.productId,
          pizzaType: 1,
          size: 40,
        }),
        generateProductItem({
          productRef: pizza2.productId,
          pizzaType: 2,
          size: 20,
        }),
        generateProductItem({
          productRef: pizza2.productId,
          pizzaType: 2,
          size: 30,
        }),
        generateProductItem({
          productRef: pizza2.productId,
          pizzaType: 2,
          size: 40,
        }),

        // Пицца "Чоризо фреш"
        generateProductItem({
          productRef: pizza3.productId,
          pizzaType: 1,
          size: 20,
        }),
        generateProductItem({
          productRef: pizza3.productId,
          pizzaType: 2,
          size: 30,
        }),
        generateProductItem({
          productRef: pizza3.productId,
          pizzaType: 2,
          size: 40,
        }),

        // Остальные продукты
        generateProductItem({ productRef: 1 }),
        generateProductItem({ productRef: 2 }),
        generateProductItem({ productRef: 3 }),
        generateProductItem({ productRef: 4 }),
        generateProductItem({ productRef: 5 }),
        generateProductItem({ productRef: 6 }),
        generateProductItem({ productRef: 7 }),
        generateProductItem({ productRef: 8 }),
        generateProductItem({ productRef: 9 }),
        generateProductItem({ productRef: 10 }),
        generateProductItem({ productRef: 11 }),
        generateProductItem({ productRef: 12 }),
        generateProductItem({ productRef: 13 }),
        generateProductItem({ productRef: 14 }),
        generateProductItem({ productRef: 15 }),
        generateProductItem({ productRef: 16 }),
        generateProductItem({ productRef: 17 }),
      ],
    });
  };

  const createCarts = async () => {
    await prisma.cart.createMany({
      data: [
        {
          userRef: 1,
          totalAmount: 0,
          token: "1111",
        },
        {
          userRef: 2,
          totalAmount: 0,
          token: "2222",
        },
      ],
    });
  };

  const createCartItems = async () => {
    await prisma.cartItem.create({
      data: {
        productItemRef: 1,
        cartRef: 1,
        quantity: 2,
        ingredients: {
          connect: [
            { ingredientId: 1 },
            { ingredientId: 2 },
            { ingredientId: 3 },
          ],
        },
      },
    });
  };

  await init();
}

async function down() {
  const clearTables = async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  };

  await clearTables();
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
