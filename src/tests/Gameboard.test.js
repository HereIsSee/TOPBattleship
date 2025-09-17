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
test('generateShipCoordinates generates coordinates correctly', () => {
    const gameboard = new Gameboard();
    const coordinates = gameboard.generateShipCoordinates();

    // Check that it returns an array of length 2
    expect(Array.isArray(coordinates)).toBe(true);
    expect(coordinates).toHaveLength(2);

    // Check the first object has x_cord_start and y_cord_start
    expect(coordinates[0]).toEqual(
        expect.objectContaining({
            x_cord_start: expect.any(Number),
            y_cord_start: expect.any(Number)
        })
    );

    // Check the second object has x_cord_end and y_cord_end
    expect(coordinates[1]).toEqual(
        expect.objectContaining({
            x_cord_end: expect.any(Number),
            y_cord_end: expect.any(Number)
        })
    );
});
