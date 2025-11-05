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

import React, { useState, useMemo } from "react";

// Sample large dataset
const products = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Product ${i}`,
  price: Math.round(Math.random() * 1000),
  inStock: Math.random() > 0.5,
}));

const Memo = () => {
    const [count, setCount] = useState(0);
    const [items] = useState(intialItems);

    const findItems = useMemo(() => {
        return items.find((item) => item.isSelected)
    }, [items, count])


    return (
        <div>
            <h1>Count: {count}</h1>
            <h1>Selected Item: {findItems?.id}</h1>
            <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
        </div>
    )
}

export default Memo;
