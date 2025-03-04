import React from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({
  params: { id },
}: ProductPageProps): React.JSX.Element {
  return <div>id: {id}</div>;
}
