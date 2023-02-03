import React from 'react';

function RollDiceForm({ diceOptions, setDiceOptions, addDiceOption, updateDiceOption }) {
  return (
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
          {index !== 0 && (
            <button className="remove-dice-button" onClick={() => setDiceOptions(diceOptions.filter((_, i) => i !== index))}>Remove</button>
          )}
        </div>
      ))}
      <button className="add-dice-button" onClick={addDiceOption}>Add Dice</button>
    </div>
  );
}

export default RollDiceForm;