import React from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total !== 0 ? (good - bad) / total : 0;
  const positivePercentage = total !== 0 ? (good / total) * 100 : 0;

  return (
    <div>
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

export default Statistics;
