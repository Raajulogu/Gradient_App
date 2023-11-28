import "./App.css";
import {  Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";

function App() {
  Chart.register(CategoryScale);
  let [inputValue, setInputValue] = useState("50");
  let [maxValue, setMaxValue] = useState("100");
  let [errorMessage, setErrorMessage] = useState("");
  let [gradientGraphHeight, setGradientGraphHeight] = useState(0);
  let [gradientColor, setGradientColor] = useState("#C2E3FF");
  let [pieData, setPieData] = useState({
    labels: ["Input Value"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#4CAF50", "#ccc"],
      },
    ],
  });

  let plotGraphs = () => {
    const input = parseFloat(inputValue);
    const max = parseFloat(maxValue);

    if (isNaN(input) || isNaN(max)) {
      setErrorMessage("Please enter valid numeric values.");
      return;
    }

    if (input > max) {
      setErrorMessage("Input Value cannot be greater than Max Value.");
      return;
    }

    setErrorMessage("");

    // Pie Graph Data
    let pieData = {
      labels: ["Input Value"],
      datasets: [
        {
          data: [input, max - input],
          backgroundColor: [gradientColor,"#f5f5f5"],
        },
      ],
    };
    setPieData(pieData);

    // Gradient Vertical Bar Graph Height
    let percentage = (input / max) * 100;
    setGradientGraphHeight(percentage);
  };
  let handleGradientColor = (color) => {
    setGradientColor(color);
  };

  useEffect(()=>{
    plotGraphs()
  },[])

  return (
    <div className="App">
      <h2>Enter Values</h2>
      <div className="input-container">
        <div>
          <label htmlFor="inputValue">Input Value:</label>
          <input
            type="text"
            id="inputValue"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="maxValue">Max Value:</label>
          <input
            type="text"
            id="maxValue"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div>
      </div>
      <br />
      <button onClick={plotGraphs}>Plot Graphs</button>
      <br />
      <div className="color-option-container">
        <h2>Selection colors</h2>
        <div
          className="color-option-row"
          onClick={() => handleGradientColor("#FFFFFF")}
        >
          <div className="color-name">
            <div className="color-box-1"></div>
            FFFFFF
          </div>
          <div>100%</div>
        </div>

        <div
          className="color-option-row"
          onClick={() => handleGradientColor("#C2E3FF")}
        >
          <div className="color-name">
            <div className="color-box-2"></div>
            C2E3FF
          </div>
          <div>100%</div>
        </div>

        <div
          className="color-option-row"
          onClick={() => handleGradientColor("#008CFF")}
        >
          <div className="color-name">
            <div className="color-box-3"></div>
            008CFF
          </div>
          <div>100%</div>
        </div>

        <div
          className="color-option-row"
          onClick={() => handleGradientColor("#003F73")}
        >
          <div className="color-name">
            <div className="color-box-4"></div>
            003F73
          </div>
          <div>100%</div>
        </div>
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div className="Graph-container">
        <div className="pie-graph">
          <h3>Pie Graph</h3>
          <Pie data={pieData} />
          <br />
          <h2>Level 1</h2>
        </div>

        <div className="bar-graph">
          <h3>Normal Bar Graph</h3>
          <div className="bar-graph-box">
            <div
              className="bar-graph"
              style={{
                background:`${gradientColor}`,
                height: `${gradientGraphHeight}%`,
              }}
            ></div>
          </div>
          <br />
          <h2>Level 2</h2>
        </div>

        <div className="gradient-graph-container">
          <h3>Gradient Vertical Bar Graph</h3>
          <div className="gradient-graph-box">
            <div
              className="gradient-graph"
              style={{
                background: `linear-gradient(to top, ${gradientColor} ${gradientGraphHeight}%,#f5f5f5 )`,
                height: `${gradientGraphHeight}%`,
              }}
            ></div>
          </div>
          <br />
          <h2>Level 3</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
