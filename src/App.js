import React, { useState } from "react";
import './App.css'

function RollDice() {
  const [diceOptions, setDiceOptions] = useState([{ numDice: 1, numSides: 6 }]);
  const [results, setResults] = useState([]);
  const [hideRolls, setHideRolls] = useState(false);
  const [diceOptionsCopy, setDiceOptionsCopy] = useState([]);


  const roll = () => {
    let newResults = [];
    const diceOptionsCopy = JSON.parse(JSON.stringify(diceOptions));
    setDiceOptionsCopy(diceOptionsCopy)
    diceOptionsCopy.forEach(({ numDice, numSides }) => {
      let newNumDice = numDice
      let newNumSides = numSides
      let result = [];
      let total = 0;
      for (let i = 0; i < newNumDice; i++) {
        let roll = Math.floor(Math.random() * newNumSides) + 1;
        result.push(roll);
        total += roll;
        console.log('total ', total)
      }
      newResults.push({ result, total });
    });
    setResults(newResults);
    console.log('newResults ', newResults)
  };

  const addDiceOption = () => setDiceOptions([...diceOptions, { numDice: 1, numSides: 6 }]);

  const handleRollDice = () => {
    let updatedOptions = [...diceOptions];
    updatedOptions.forEach((diceOption, index) => {
      diceOption.numDice = parseInt(diceOption.numDice, 10);
      diceOption.numSides = parseInt(diceOption.numSides, 10);
    });
    setDiceOptions(updatedOptions);
    roll();
  };

  const handleRemoveDie = (index) => {
    setDiceOptions(diceOptions.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, key, newValue) => {
    const reg = /^[1-9]\d*$/;
    if (reg.test(newValue)) {
      let updatedOptions = [...diceOptions];
      updatedOptions[index][key] = parseInt(newValue, 10);
      setDiceOptions(updatedOptions);
    }
  };
  

  return (
    <div className="background">
      <div className="main">
        {diceOptions.map((diceOption, index) => (
          <div key={index} className="dice-input">

            <input
              type="number"
              value={diceOption.numDice}
              onChange={(e) => handleInputChange(index, "numDice", e.target.value)}
            />
            <label>dice</label>

            <input
              type="number"
              value={diceOption.numSides}
              onChange={(e) => handleInputChange(index, "numSides", e.target.value)}
            />
            <label>sided</label>

            {index !== 0 && (
              <button className="remove-dice-button" onClick={() => handleRemoveDie(index)}>Remove</button>
            )}
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
                        className={`result ${ diceOptionsCopy[index].numSides && roll == diceOptionsCopy[index].numSides ? "highlight-green" : roll === 1 ? "highlight-red" : ""}`}
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
          <button className="roll-dice-button" onClick={handleRollDice}>Roll Dice</button>


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