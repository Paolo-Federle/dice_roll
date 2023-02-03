import React from "react";

const RollDiceResults = ({ results, hideRolls, diceOptions }) => (
  <div className="dice-result">
    <div>
      {!hideRolls && results.map(({ result, total }, index) => (
        <React.Fragment key={index}>
          <span className="result-set">
            ({result.map((roll, rollIndex) => (
              <React.Fragment key={rollIndex}>
                {diceOptions[rollIndex] && (
                  <span
                    className={`result ${roll === diceOptions[rollIndex].numSides ? "highlight-green" : roll === 1 ? "highlight-red" : ""}`}
                  >
                    {roll}
                  </span>
                )}
                {rollIndex !== result.length - 1 && " + "}
              </React.Fragment>
            ))})
          </span>
          {index !== results.length - 1 && " + "}
        </React.Fragment>
      ))}
      = <span className="roll-result">{results.reduce((total, { total: rollTotal }) => total + rollTotal, 0)}</span>
    </div>
  </div>
);

export default RollDiceResults;