container = document.getElementById("container");
makeGrid(16);

function changeLightness(delta, hslStr) {
    const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);

    const newLightness = Math.max(
        0,
        Math.min(100, lightness + parseFloat(delta))
    );

    return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
};

function makeGrid(squares) {
    container.innerHTML = "";
    let cnt = 0;
    for (let i = 0; i < squares; i++) {
        let row = document.createElement("div");
        row.style.display = "flex";
        row.style.height = 960 / squares + "px";
        row.style.width = "960px";
        for (let j = 0; j < squares; j++) {
            let div = document.createElement("div");
            row.appendChild(div);
            div.classList.add("cell");
            div.id = cnt;
            div.style.height = 960 / squares + "px";
            div.style.width = 960 / squares + "px";
            cnt++;
        }
        container.appendChild(row);
    }

    cells = document.getElementsByClassName("cell");
    const numOfHovers = new Map();
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("mouseover", () => {
            let newHSL = "";
            if (!numOfHovers.has(cells[i].id)) {
                let hue = Math.floor(Math.random() * 360);
                newHSL = `hsl(${hue}, 100%, 54%)`
                console.log("new!");
            } else {
                newHSL = changeLightness(-6, numOfHovers.get(cells[i].id));
            }
            console.log(newHSL);
            numOfHovers.set(cells[i].id, newHSL);
            cells[i].style.background = newHSL;
        });
    }
}
function setDimension() {
    let squares = prompt("Enter the number of grids per column and row");
    if (squares > 100 || squares <= 0) {
        alert("Invalid, must be between 1 and 100");
        return;
    }
    makeGrid(squares);
}

document.getElementById("btn").addEventListener("click", () => {
    setDimension();
})