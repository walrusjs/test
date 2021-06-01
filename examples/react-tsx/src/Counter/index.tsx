import React, { useState } from 'react';

export const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <div data-testid='count-announcement'>
        you have been clicked {count} times
      </div>
      <button
        data-testid='increase-button'
        onClick={() => {
          setCount(count + 1);
        }}
      >
        increase count
      </button>
    </div>
  )
}
