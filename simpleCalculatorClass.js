export class SimpleCalculator {
  constructor(expression, expressionResult, historyList) {
    this.historyList = historyList;
    this.expression = expression;
    this.expressionResult = expressionResult;
    this.calculationHistory = [];
    this.lastHistoryExpression;
    this.expressionValue;
    this.currentState = {
      firstNumber: "0",
      opSign: "",
      secondNumber: "",
    }
  }

  clearOutput() {
    this.currentState = {
      firstNumber: "0",
      opSign: "",
      secondNumber: "",
    };
  }
  clearCharacter() {
    if (
      this.currentState.firstNumber !== "" &&
      this.currentState.secondNumber === ""
    ) {
      if (this.currentState.firstNumber.length == 1) {
        this.currentState.firstNumber = "0";
        this.rerenderDisplay();
      } else {
        this.currentState.firstNumber = this.currentState.firstNumber.slice(0, -1);
        this.rerenderDisplay();
      }
    }
    if (this.currentState.secondNumber !== "") {
      if (this.currentState.secondNumber.length == 1) {
        this.currentState.secondNumber = "0";
        this.rerenderDisplay();
      } else {
        this.currentState.secondNumber = currentState.secondNumber.slice(0, -1);
        this.rerenderDisplay();
      }
    }
  }
  clearAll() {
    this.expression.innerHTML = "";
    this.expressionResult.innerHTML = "0";
    this.clearOutput();
  }

  deleteCurrentOperand() {
    if (
      this.currentState.firstNumber !== "" &&
      this.currentState.secondNumber === ""
    ) {
      this.currentState.firstNumber = "0";
    }
    if (this.currentState.secondNumber !== "") {
      this.currentState.secondNumber = "0";
    }
    this.expressionResult.innerHTML = "0";
  }

  appendNumber(x) {
    if (
      (x.innerHTML === "." &&
        this.currentState.firstNumber.includes(".") &&
        this.currentState.secondNumber === "") ||
      (x.innerHTML === "." &&
        this.currentState.secondNumber.indexOf(".") !== -1)
    ) {
      return;
    }
    if (this.currentState.firstNumber === "0") {
      this.currentState.firstNumber = "";
    }
    if (this.currentState.secondNumber === "0") {
      currentState.secondNumber = "";
    }
    if (this.currentState.opSign === "") {
      this.currentState.firstNumber += x.innerHTML;
    }
    if (this.currentState.opSign !== "") {
      this.currentState.secondNumber += x.innerHTML;
    }
    this.rerenderDisplay();
  }

  appendOperation(x) {
    if (this.currentState.opSign === "") {
      this.calculationHistory.push(this.currentState);
      this.currentState.opSign = x.innerHTML;
    }
    if (
      this.currentState.opSign !== "" &&
      this.currentState.secondNumber !== ""
    ) {
      this.calculate();
      this.currentState.opSign = x.innerHTML;
    }
    if (
      this.currentState.firstNumber !== "" &&
      this.currentState.opSign !== "" &&
      this.currentState.secondNumber === ""
    ) {
      this.currentState.opSign = x.innerHTML;
    }
    this.rerenderDisplay();
  }

  rerenderDisplay() {
    if (this.currentState.opSign === "") {
      this.expressionResult.innerHTML = this.currentState.firstNumber;
    }
    if (this.currentState.opSign !== "") {
      this.expression.innerHTML = `${this.currentState.firstNumber}${this.currentState.opSign}`;
    }
    if (this.currentState.secondNumber !== "") {
      this.expressionResult.innerHTML = `${this.currentState.secondNumber}`;
    }
  }

  calculate() {
    this.calculationHistory.push(this.currentState);
    this.lastHistoryExpression = this.calculationHistory.at(-1);
    let lastFirstNumber = +this.lastHistoryExpression.firstNumber;
    let lastSecondNumber = +this.lastHistoryExpression.secondNumber;
    switch (this.lastHistoryExpression.opSign) {
      case "+":
        this.expressionValue = lastFirstNumber + lastSecondNumber;
        break;
      case "-":
        this.expressionValue = lastFirstNumber - lastSecondNumber;
        break;
      case "X":
        this.expressionValue = lastFirstNumber * lastSecondNumber;
        break;
      case "/":
        this.expressionValue = lastFirstNumber / lastSecondNumber;
        break;
      default:
        return;
    }
    this.expressionValue = +this.expressionValue.toFixed(12);
    this.expression.innerHTML = `${Object.values(this.lastHistoryExpression).join("")}=`;
    this.expressionResult.innerHTML = parseInt(this.expressionValue);
    this.currentState = {
      firstNumber: `${this.expressionValue}`,
      opSign: "",
      secondNumber: "",
    };
    this.rerenderDisplay();
    this.refreshHistory();
  }

  oneNumberCalculation(x) {
    if (
      this.currentState.firstNumber !== "" &&
      this.currentState.opSign === "" &&
      this.currentState.secondNumber === ""
    ) {
      this.singleNumCalculationCases(x, "firstNumber");
    }

    if (this.currentState.secondNumber !== "") {
      this.singleNumCalculationCases(x, "secondNumber");
    }
  }

  singleNumCalculationCases(x, num) {
    let previous = this.currentState[num];
    switch (x.innerHTML) {
      case "%":
        this.expression.innerHTML = `(${previous})/100`;
        this.currentState[num] = `${this.currentState[num] / 100}`;
        this.expressionResult.innerHTML = `${this.currentState[num]}`;
        this.rerenderDisplay();
        break;
      case "1/x":
        this.expression.innerHTML = `1/(${previous})`;
        this.currentState[num] = `${1 / this.currentState[num]}`;
        this.expressionResult.innerHTML = `${this.currentState[num]}`;
        this.rerenderDisplay();
        break;
      case "x2":
        this.expression.innerHTML = `(${previous})²`;
        this.currentState[num] = `${
          this.currentState[num] * this.currentState[num]
        }`;
        this.expressionResult.innerHTML = `${this.currentState[num]}`;
        this.rerenderDisplay();
        break;
      case "sqrt":
        this.expression.innerHTML = `√(${previous})`;
        this.currentState[num] = `${Math.sqrt(this.currentState[num])}`;
        this.expressionResult.innerHTML = `${this.currentState[num]}`;
        this.rerenderDisplay();
        break;
    }
  }

  negation() {
    if (
      this.currentState.firstNumber !== "" &&
      this.currentState.secondNumber === ""
    ) {
      if (this.currentState.firstNumber.includes("-")) {
        this.currentState.firstNumber.replace("-", "");
      } else {
        this.currentState.firstNumber = "-" + this.currentState.firstNumber;
      }
    }

    if (this.currentState.secondNumber !== "") {
      if (this.currentState.secondNumber.includes("-")) {
        this.currentState.secondNumber.replace("-", "");
      } else {
        this.currentState.secondNumber = "-" + this.currentState.secondNumber;
      }
    }
    this.rerenderDisplay();
  }

  refreshHistory() {
    let lastHistoryExpressionString = Object.values(
      this.lastHistoryExpression
    ).join("");
    this.historyList.innerHTML += `<li>
                <span id="history-output">${lastHistoryExpressionString}=</span>
                <span id="history-result">${this.expressionValue}</span>
            </li>`;
  }

  deleteHistory() {
    this.calculationHistory = [];
    this.historyList.innerHTML = "";
  }
}


export function generateSimpleCalcHTML() {
  let mainContent = document.getElementById("main");
  let history = document.getElementById("history");
  let board = document.createElement("div");
  let functions = document.createElement("div");
  board.setAttribute("id", "board");
  board.innerHTML = `
<div id="nav">
  <div id="nav-left">
          <button id="menu">
              <span class="menu-line"></span>
              <span class="menu-line"></span>
              <span class="menu-line"></span>
          </button>
          <span>Standard</span>
      </div>
      <button id="history-btn">HISTORY</button>
  </div>

  <div id="printed">
      <div id="expressions">
      <span id="expression"></span>
      <span id="expression-result">0</span>
  </div>
</div>`;

functions.setAttribute('id','functions');
functions.innerHTML = `
<button class="one-number-operation">%</button>
<button class="delete-operation">CE</button>
<button class="delete-operation">C</button>
<button class="delete-operation">Clear</button>

<button class="one-number-operation">1/x</button>
<button class="one-number-operation">x2</button>
<button class="one-number-operation">sqrt</button>
<button class="two-number-operation">/</button>

<button class="number">7</button>
<button class="number">8</button>
<button class="number">9</button>
<button class="two-number-operation">X</button>

<button class="number">4</button>
<button class="number">5</button>
<button class="number">6</button>
<button class="two-number-operation division">-</button>

<button class="number">1</button>
<button class="number">2</button>
<button class="number">3</button>
<button class="two-number-operation addition">+</button>

<button id="negation-button" class="white">+/-</button>
<button class="number">0</button>
<button class="number white">.</button>
<button id="calculate">=</button>
</div>
`
mainContent.appendChild(board);
mainContent.appendChild(functions);

history.innerHTML = `        
<span>HISTORY</span>
  <ul id="history-list">
      
  </ul>
<button id="delete-history-button">Delete history</button>`
}




