import React from "react";



const StatisticLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  );
};


const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No Given Feedback</p>
      </div>
    );
  }

  const average = (good - bad) / total;
  const positivePercentage = (good / total) * 100;

  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="total" value={total} />
      <StatisticLine text="average" value={average.toFixed(2)} />
      <StatisticLine text="positive" value={positivePercentage.toFixed(2) + " %"} />
    </div>
  );
};


export default Statistics;
