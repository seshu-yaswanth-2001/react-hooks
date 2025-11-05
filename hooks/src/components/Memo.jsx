/**
 * useMemo - is used to memoize the complex calcuations
 *
 * formal Definiation:
 * Memoizes expensive calculations and returns a cached value that only recalculates when dependencies change.
 *
 * Key Difference from use Callback:
 * useCallback - returns a function
 * useMemo - returns a value
 *
 *
 * How it works:
 * Takes a function that returns a value and a dependency array
 * React stores the computed value
 * On re-renders, if dependencies haven't changed, returns cached value
 * If dependencies changed, re-executes the function and caches new result
 *
 *
 * TIPS:
 * Identify expensive computations before applying
 * Include all necessary dependencies
 * Avoid memoizing simple values (adds unnecessary complexity)
 * Use performance monitoring tools to measure impact
 */

import { useState, useMemo } from "react";

// Sample large dataset
const products = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Product ${i}`,
  price: Math.round(Math.random() * 1000),
  inStock: Math.random() > 0.5,
}));

const Memo = () => {
  const [search, setSearch] = useState("");
  const [showInStock, setShowInStock] = useState(false);
  const [lowToHigh, setLowToHigh] = useState(true);

  const filterProducts = useMemo(() => {
    console.log("Filter Products");
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (!showInStock || product.inStock)
    );
  }, [search, showInStock]);

  const sortedProducts = useMemo(() => {
    console.log("Sort Products");
    return [...filterProducts]
      .slice(0, 20)
      .sort((a, b) => (lowToHigh ? a.price - b.price : b.price - a.price));
  }, [filterProducts, lowToHigh]);

  return (
    <div>
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={showInStock}
          onChange={(e) => setShowInStock(e.target.checked)}
        />
        Show only in-stock
      </label>

      <button onClick={() => setLowToHigh((prev) => !prev)}>
        {`Sort by Price: ${lowToHigh ? "High to Low" : "Low to High"}`}
      </button>

      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} -{" "}
            {product.inStock ? "In Stock" : "Out of Stock"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Memo;
