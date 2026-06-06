import { useEffect, useState } from "react";
import type { Product } from "../types";
import { useSearchParams } from "react-router-dom";
import { dummyProducts } from "../assets/assets";

const SearchResults = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchparams] = useSearchParams();
  const query = searchparams.get("q") || "";

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setProducts(
      dummyProducts.filter((p: any) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
    setLoading(false);
  }, [query]);
  return <div>SearchResults</div>;
};

export default SearchResults;
