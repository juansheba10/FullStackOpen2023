import React from "react";

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
