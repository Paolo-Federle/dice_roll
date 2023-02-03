import React, { useState } from "react";
import './App.css'

function RollDice() {
  const [diceOptions, setDiceOptions] = useState([{ numDice: 1, numSides: 6 }]);
  const [results, setResults] = useState([]);
  const [hideRolls, setHideRolls] = useState(false);

  const roll = () => {
    let newResults = [];
    diceOptions.forEach(({ numDice, numSides }) => {
      let result = [];
      let total = 0;
      for (let i = 0; i < numDice; i++) {
        let roll = Math.floor(Math.random() * numSides) + 1;
        result.push(roll);
        total += roll;
      }
      newResults.push({ result, total });
    });
    setResults(newResults);
  };

  const addDiceOption = () => {
    setDiceOptions([...diceOptions, { numDice: 1, numSides: 6 }]);
  };

  const updateDiceOption = (index, key, value) => {
    let updatedOptions = [...diceOptions];
    updatedOptions[index][key] = value;
    setDiceOptions(updatedOptions);
  };

  return (
    <div className="background">
      <div className="main">
        {diceOptions.map((diceOption, index) => (
          <div key={index} className="dice-input">
            
            <input
              type="number"
              value={diceOption.numDice}
              onChange={(e) => updateDiceOption(index, "numDice", e.target.value)}
            />
            <label>dice</label>
            
            <input
              type="number"
              value={diceOption.numSides}
              onChange={(e) => updateDiceOption(index, "numSides", e.target.value)}
            />
            <label>sided</label>
          </div>
        ))}
        <button className="add-dice-button" onClick={addDiceOption}>Add Dice</button>
        <div className="dice-result">
          <div>
            {!hideRolls && results.map(({ result, total }, index) => (
              <React.Fragment key={index}>
                <span className="result-set">
                  ({result.map((roll, rollIndex) => (
                    <React.Fragment key={rollIndex}>
                      <span
                        className={`result ${roll == diceOptions[index].numSides ? "highlight-green" : roll === 1 ? "highlight-red" : ""}`}
                      >
                        {roll}
                      </span>
                      {rollIndex !== result.length - 1 && " + "}
                    </React.Fragment>
                  ))})
                </span>
                {index !== results.length - 1 && " + "}
              </React.Fragment>
            ))}
            = <span className="roll-result">{results.reduce((total, { total: rollTotal }) => total + rollTotal, 0)}</span>
          </div>
          <button className="roll-dice-button" onClick={roll}>Roll Dice</button>
        </div>
        <div>
          <input type="checkbox" checked={hideRolls} onChange={() => setHideRolls(!hideRolls)} />
          <label>Hide Single Dice Rolls</label>
        </div>
      </div>
    </div>
  );
}

export default RollDice;