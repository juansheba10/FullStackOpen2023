import React, { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // handlers for each button
  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }


 // Calculate statistics
 const total = good + neutral + bad;
 const average = total !== 0 ? (good - bad) / total : 0;
 const positivePercentage = total !== 0 ? (good / total) * 100 : 0;

 return (
   <div>
     <h1>Give feedback</h1>
     <button onClick={handleGoodClick}>good</button>
     <button onClick={handleNeutralClick}>neutral</button>
     <button onClick={handleBadClick}>bad</button>

     <h2>Statistics</h2>
     <p>good {good}</p>
     <p>neutral {neutral}</p>
     <p>bad {bad}</p>
     <p>total {total}</p>
     <p>average {average}</p>
     <p>positive {positivePercentage} %</p>
   </div>
 );
}

export default App;
