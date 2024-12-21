import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [history, setHistory] = useState("");

  const handleButtonPress = (value) => {
    if (value === "C") {
      setDisplayValue("0");
      setHistory("");
    } else if (value === "←") {
      setDisplayValue((prev) =>
        prev.length > 1 ? prev.slice(0, -1) : "0"
      );
    } else if (value === "=") {
      try {
        // Use a safer evaluation
        const result = Function(`'use strict'; return (${displayValue})`)();
        setHistory(displayValue + " =");
        setDisplayValue(result.toString());
      } catch {
        setDisplayValue("Error");
      }
    } else {
      setDisplayValue((prev) =>
        prev === "0" || prev === "Error" ? value : prev + value
      );
    }
  };

  const buttons = [
    ["C", "←", "/", "*"],
    ["7", "8", "9", "-"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "="],
    ["0", ".", ""],
  ];

  return (
    <div className="container">
      <div className="display">
        <div className="history">{history}</div>
        <div className="current">{displayValue}</div>
      </div>
      <div className="buttons">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((button, buttonIndex) => (
              <button
                key={buttonIndex}
                className={`button ${button === "=" ? "equals" : ""}`}
                onClick={() => handleButtonPress(button)}
                disabled={button === ""}
              >
                {button}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
