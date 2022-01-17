//import {generateHTML} from './simpleCalcHTML.js';
import {SimpleCalculator, generateSimpleCalcHTML} from './simpleCalculatorClass.js';
generateSimpleCalcHTML();

let mainContent = document.getElementById("main");
let history = document.getElementById("history");
let expression = document.querySelector("#expression");
let expressionResult = document.querySelector("#expression-result");
let historyList = document.getElementById("history-list");
let numberButtons = document.querySelectorAll(".number");
let deleteOperationButtons = document.querySelectorAll(".delete-operation");
let twoNumberOperationButtons = document.querySelectorAll(".two-number-operation");
let oneNumberOperationButtons = document.querySelectorAll(".one-number-operation");
let historyBtn = document.querySelector("#history-btn");
let negationBtn =  document.getElementById("negation-button")
let calculateButton = document.querySelector("#calculate");
let deleteHistoryButton = document.getElementById("delete-history-button");


let calculator = new SimpleCalculator(expression, expressionResult, historyList);
numberButtons.forEach((x) => {
  x.addEventListener("click", () => calculator.appendNumber(x));
});

twoNumberOperationButtons.forEach((x) => {
  x.addEventListener("click", () => calculator.appendOperation(x));
});

calculateButton.addEventListener("click", () => calculator.calculate());

deleteOperationButtons.forEach((x) => {
  if (x.innerHTML == "C") {
    x.addEventListener("click", () => calculator.clearAll());
  }

  if (x.innerHTML == "CE") {
    x.addEventListener("click", () => calculator.deleteCurrentOperand());
  }

  if(x.innerHTML == "Clear"){
    x.addEventListener("click", () => calculator.clearCharacter())
  }
});

oneNumberOperationButtons.forEach((x) => {
  x.addEventListener("click", () => calculator.oneNumberCalculation(x))
});

negationBtn.addEventListener("click", () => calculator.negation())

deleteHistoryButton.addEventListener("click", () => calculator.deleteHistory());



///////////media query width smaller than 800px (history visibility settings)////////////////////////
window.addEventListener("click", function (e) {
  // if we aren't clicking on the history div and we aren't clicking on the show history button then hide the history div.
  if (history !== e.target && e.target !== historyBtn) {
    mainContent.style.filter = "blur(0px)";
    history.style.display = "none";
  }
});

historyBtn.addEventListener("click", () => {
  history.style.display = "block";
  mainContent.style.filter = "blur(10px)";
});