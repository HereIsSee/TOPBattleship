import Gameboard from "../modules/Gameboard";

test('placeShip with correct data', ()=>{
    const gameboard = new Gameboard();

    expect(gameboard.placeShip(2, {x_cord_start: 0, y_cord_start: 0}, {x_cord_end: 1, y_cord_end:0})).toBe(true);
});

test('placeShip incorrect data', ()=>{
    const gameboard = new Gameboard();

    expect(()=>{
        gameboard.placeShip(2, {x_cord_start: 0, y_cord_start: 0}, {x_cord_end: 1, y_cord_end:1})
    }).toThrow();
});

test('placeShip, ship in position already placed', ()=>{
    const gameboard = new Gameboard();
    gameboard.placeShip(4, {x_cord_start: 0, y_cord_start: 0}, {x_cord_end: 0, y_cord_end:3});

    expect(gameboard.placeShip(2, {x_cord_start: 0, y_cord_start: 0}, {x_cord_end: 1, y_cord_end:0})).toBe(false);
});

test('receiveAttack, attack successful', ()=>{
    const gameboard = new Gameboard();
    gameboard.placeShip(4, {x_cord_start: 0, y_cord_start: 0}, {x_cord_end: 0, y_cord_end:3});

    expect(gameboard.receiveAttack({x_cord: 0, y_cord: 0})).toBe(true);
});

test('receiveAttack, attack failed, attacking already attacked space', ()=>{
    const gameboard = new Gameboard();
    gameboard.placeShip(4, {x_cord_start: 0, y_cord_start: 0}, {x_cord_end: 0, y_cord_end:3});
    gameboard.receiveAttack({x_cord: 0, y_cord: 0});
    expect(gameboard.receiveAttack({x_cord: 0, y_cord: 0})).toBe(false);
});

test('allShipsSunk, all ships are sunk', ()=>{
    const gameboard = new Gameboard();
    gameboard.placeShip(2, {x_cord_start:0, y_cord_start: 3}, {x_cord_end: 1, y_cord_end: 3});
    gameboard.placeShip(1, {x_cord_start:0, y_cord_start: 0}, {x_cord_end: 0, y_cord_end: 0});

    gameboard.receiveAttack({x_cord: 0, y_cord: 3});
    gameboard.receiveAttack({x_cord: 1, y_cord: 3});
    
    gameboard.receiveAttack({x_cord: 0, y_cord: 0});

    expect(gameboard.allShipsSunk()).toBe(true);
});
test('allShipsSunk, all ships are not sunk', ()=>{
    const gameboard = new Gameboard();
    gameboard.placeShip(2, {x_cord_start:0, y_cord_start: 3}, {x_cord_end: 1, y_cord_end: 3});
    gameboard.placeShip(1, {x_cord_start:0, y_cord_start: 0}, {x_cord_end: 0, y_cord_end: 0});

    gameboard.receiveAttack({x_cord: 0, y_cord: 3});
    gameboard.receiveAttack({x_cord: 1, y_cord: 3});

    expect(gameboard.allShipsSunk()).toBe(false);
});