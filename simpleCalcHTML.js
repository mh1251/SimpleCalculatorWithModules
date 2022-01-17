export function generateHTML() {
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
