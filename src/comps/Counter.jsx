import { useState } from 'react';

export default function Counter({className, btn, qty, changeFx}) {
    const [count, setCount] = useState(qty);
    const handlePlus = () => {
        if (count < 100) {
            let plusOne = count + 1
            setCount(plusOne);
            changeFx(plusOne)
        }
    }
    const handleMinus = () => {
        if (count > 1) {
            let minusOne = count - 1
            setCount(minusOne);
            changeFx(minusOne)
        }
    }
  return (
    <div className={className}>
        <button className={btn} onClick={() => handleMinus()}>-</button>
        <h3 className="m05">{count}</h3>
        <button className={btn} onClick={() => handlePlus()}>+</button>
    </div>
  )
}