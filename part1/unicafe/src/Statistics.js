import React from "react";



const StatisticLine = ({ text, value }) => {
  return (
      <tr>
          <td>{text}</td>
          <td>{value}</td>
      </tr>
  );
}


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
    <table>
        <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={`${positivePercentage} %`} />
        </tbody>
    </table>
);
};


export default Statistics;
