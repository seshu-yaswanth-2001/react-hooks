/**
 * useCallback is used for caching functions across multiple renders
 *
 * returns a memoized function
 *
 * Syntax: useCallback(fn, dependencyList);
 *
 * returns -> cached function if there is no change in dependencyList, and vise versa if there is change in value
 *
 * Example: Assume if there is counter app we have increment function which will add +1 on every click
 *
 * Assume 0 & 1 having the same dependency then the useCallback will return the cached function
 * Assume from 2 dependency will change then it will return the updated function
 *
 * in theory ->
 * counter (intial - 0) points to heap#500
 * counter (intial - 1) assume points to heap#500
 * counter(intial - 2) assume points to heap#600
 *
 * this will work until and unless you're updating state by prev value if the state is directly update
 * it will always refers to the first render function only this happens because of the concept of closures.
 *
 * explanation of how closures:
 *
 * when the component first renders the count is 0 and when the first increment is clicked the count is 0
 * and when increment is clicket it will updated the count to 1 in its 1st click in the same due to the
 * dependency is same as first click from the above example the the callback function memoizes the function
 * with its lexical enviroment with count 0
 *
 * so while updating the state in the useCallbacks() just try to update the state by prev
 *
 */

/**
 * When to use:
 *
 * Passing functions as props to child components (especially with React.memo)
 * Functions used inside useEffect dependencies
 * Expensive function recreations inside event handlers
 * Ensuring function references remain stable across renders
 */

/**
 * Performance Considerations:​
 *
 * Don't overuse - adds complexity and memory overhead
 * Only apply when you have proven performance issues
 * Measure performance before optimizing
 * Best for expensive operations or deeply nested component trees
 */

import { useCallback, useState } from "react";

const list = [];
const Callback = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
    // setCount(count + 1);
  }, [count < 2 ? 0 : count]);

  list.push(increment);
  if (list.length === 3) {
    console.log(list[0] === list[1]);
    console.log(list[1] === list[2]);
  }

  return <button onClick={increment}>Increment: {count}</button>;
};

export default Callback;
