// useMemo

import { useMemo, useState } from "react";
import { intialItems } from "./items";

const Memo = () => {
  const [count, setCount] = useState(0);
  const [items] = useState(intialItems);

  const findItems = useMemo(() => {
    return items.find((item) => item.isSelected);
  }, [items]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h1>Selected Item: {findItems?.id}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
};

export default Memo;
