import { useState } from "react";

let count = 0;
function Counter() {
  console.log("再レンダリング")
  const [countState, setCountState] = useState(0);

  const handleClickCountVar = ()  => {
    count = count + 1;
    console.log("変数カウント" + count);
    console.log("状態カウント" + countState);
  }
  
  const handleClickCountState = () => {
    // 状態カウントの更新
    setCountState(countState + 1);
    console.log("変数カウント" + count);
    console.log("状態カウント" + countState);
  }
  
  return (
    <div>
      <p>現在の変数カウント：{count}</p>
      <p>現在の状態カウント：{countState}</p>
      <button onClick={handleClickCountVar}>増やす(変数)</button>
      <button onClick={handleClickCountState}>増やす(状態)</button>
    </div>
  )
}

export default Counter