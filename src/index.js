import Gameboard from "./modules/Gameboard";



const button = document.querySelector('button');

button.addEventListener('click', ()=>{
    const gameboard = new Gameboard();

    gameboard.placeShip(3, {x_cord_start: 0, y_cord_start: 0}, {x_cord_end: 2, y_cord_end: 0});
    gameboard.receiveAttack({x_cord: 0, y_cord:0});
    // gameboard.logBoard();
    // gameboard.logShips();
});