import Ship from '../modules/Ship';

test('zero length ship', ()=>{
    expect(() => new Ship(0)).toThrow();
});
test('ship hit', ()=>{
    const ship = new Ship(3);

    ship.hit();
    expect(ship.times_hit).toBe(1);
});
test('ship is sunk', ()=>{
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});
