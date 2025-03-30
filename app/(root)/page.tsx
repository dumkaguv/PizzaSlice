import React, { Suspense } from "react";

import {
  Container,
  Title,
  TopBar,
  ProductsGroupList,
  Stories,
  SearchInput,
} from "@/shared/components/shared";

import { Filters } from "@/shared/components/shared/filters/components/filters";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(await searchParams);

  return (
    <>
      <Container className="mt-10 max-xl:mt-5">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />

        <SearchInput className="mt-3" />
      </Container>

      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0,
        )}
      />

      <Container className="my-14 max-xl:my-5">
        <Stories />
        <div className="md:flex gap-[110px] max-xl:gap-[95px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.categoryId}
                      categoryId={category.categoryId}
                      title={category.name}
                      items={category.products}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
