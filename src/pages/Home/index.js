import React, { useState, useEffect } from "react";
import "./styles.css";

import logo from "../../assets/logo.png";

function choice(sample) {
  return sample[Math.floor(Math.random() * sample.length)];
}

function App() {
  const [options, setOptions] = useState(["Lorem", "ipsum"]);
  const [selectedOption, setSelectedOption] = useState("Waiting");
  const [newOption, setNewOption] = useState("");
  const [optionsType, setOptionsType] = useState("names");
  const [optionsRangeInit, setOptionsRangeInit] = useState(0);
  const [optionsRangeEnd, setOptionsRangeEnd] = useState(10);

  function pick() {
    let interval = setInterval(() => {
      setSelectedOption(choice(options));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
    }, 2000);
  }

  useEffect(() => {
    if (!options.length) {
      setSelectedOption("Add at last two options");
    } else {
      setSelectedOption("Waiting");
    }
  }, [options]);

  function removeWord(index) {
    setOptions((options) => options.filter((item, i) => i !== index));
  }

  function removeAll() {
    if (!window.confirm("Remove all options?")) return;
    setOptions([]);
  }

  function addNewOption(e) {
    e.preventDefault();
    if (!newOption) return;

    setOptions((options) => [...options, newOption]);
    setNewOption("");
  }

  function optionsTypeChange(e) {
    setOptions([]);
    setOptionsType(e.target.value);

    if (e.target.value === "range") {
      setRange();
    }
  }

  function setRange() {
    let range = [];
    for (let i = optionsRangeInit; i <= optionsRangeEnd; i++) {
      range.push(i.toString());
    }

    setOptions(range);
  }

  useEffect(() => {
    if (optionsType === "range") {
      if (optionsRangeEnd - optionsRangeInit === 0) {
        setSelectedOption("Define valid a range");
        return;
      }

      setRange();
    }
  }, [optionsRangeEnd, optionsRangeInit]);

  return (
    <React.Fragment>
      <div className="roulette-container">
        <img id="logo" src={logo} alt="Logo" />

        <form className="options-type" onChange={optionsTypeChange}>
          <div className="form-group">
            <input
              type="radio"
              id="names"
              name="type"
              value="names"
              defaultChecked
            />
            <label htmlFor="names">Names</label>
          </div>
          <div className="form-group">
            <input type="radio" id="range" name="type" value="range" />
            <label htmlFor="range">Numbers</label>
          </div>
        </form>
        <div className="roulette-box">
          <div className="roulette">
            <h2>{selectedOption}</h2>
          </div>
          <button
            className="button"
            onClick={pick}
            disabled={!(options.length > 1)}
          >
            Pick
          </button>
        </div>

        {optionsType === "names" ? (
          <>
            <form onSubmit={addNewOption}>
              <input
                onChange={(e) => setNewOption(e.target.value)}
                type="text"
                placeholder="Add new option"
                value={newOption}
              />
            </form>

            {options.length > 1 ? (
              <div className="remove-all">
                <button onClick={removeAll}>Remove all</button>
              </div>
            ) : null}

            <div className="words">
              {options.map((word, i) => (
                <span className="word" key={i}>
                  {word}
                  <button
                    onClick={() => {
                      removeWord(i);
                    }}
                    className="close"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </>
        ) : null}

        {optionsType === "range" ? (
          <>
            <form>
              <div className="input-group">
                <input
                  onChange={(e) => setOptionsRangeInit(e.target.value)}
                  type="number"
                  placeholder="Starts with"
                  value={optionsRangeInit}
                />
                <input
                  onChange={(e) => setOptionsRangeEnd(e.target.value)}
                  type="number"
                  placeholder="Ends with"
                  value={optionsRangeEnd}
                />
              </div>
            </form>
          </>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default App;
