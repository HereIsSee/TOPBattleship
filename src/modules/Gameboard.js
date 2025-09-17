import Ship from './Ship';

class Gameboard{
    constructor(){
        this.board = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ({ shipId: null, isHit: false }))
        );

        this.ships = [];
    }

    placeShip(ship_length, {x_cord_start, y_cord_start}, {x_cord_end, y_cord_end}){
        let x_cord_min = Math.min(x_cord_start, x_cord_end);
        let x_cord_max = Math.max(x_cord_start, x_cord_end);

        let y_cord_min = Math.min(y_cord_start, y_cord_end);
        let y_cord_max = Math.max(y_cord_start, y_cord_end);

        if((x_cord_start !== x_cord_end) && (y_cord_start !== y_cord_end)){
            throw new Error("Ship can only be placed horizontally or vertically!");
        }
        if(((x_cord_start === x_cord_end) && (y_cord_start !== y_cord_end) && (y_cord_max-y_cord_min) !== ship_length-1) || 
            ((y_cord_start === y_cord_end) && (x_cord_start !== x_cord_end) && (x_cord_max-x_cord_min) !== ship_length-1)){
            throw new Error(`Ship length does not match coordinates!`);
        }
        if(!this.#BoardSpacesAvailable({x_cord_start, y_cord_start}, {x_cord_end, y_cord_end})){
            return false;
        }

        const ship = new Ship(ship_length);
        const shipId = this.ships.length;
        this.ships[shipId] = ship;

        this.#FillBoardSpaces(shipId, {x_cord_start, y_cord_start}, {x_cord_end, y_cord_end});

        return true;
    }

    receiveAttack({x_cord, y_cord}){
        if(!this.board[x_cord][y_cord]['isHit']){
            this.board[x_cord][y_cord]['isHit'] = true;
            
            if(this.board[x_cord][y_cord]['shipId'] !== null){
                this.ships[this.board[x_cord][y_cord]['shipId']].hit();
            }

            return true;
        }

        return false;
    }

    allShipsSunk(){
        return this.ships
            .map((ship)=> ship.isSunk())
            .reduce((prev, curr)=> {
                if(prev === false){
                    return false;
                }
                return curr;
            }, true);
    }

    initiateShips(){
        const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1];
        
        for(let index = 0; index<shipLengths.length; index++){
            while(true){
                const cords = this.generateShipCoordinates(shipLengths[index]);
                const cordsValid = this.#BoardSpacesAvailable(cords[0], cords[1]);
                if(cordsValid){
                    this.placeShip(shipLengths[index], cords[0], cords[1]);
                    break;
                }
            }
        }
    }
    generateShipCoordinates(ship_length){
        // x: 0 to 9, y: 0 to 9
        // Pick primary axis, which will not change and then
        // add ship_length - 1 to secondary axis for end cords
        const primaryAxisX = Math.random() < 0.5;

        const x_cord_start = Math.floor(Math.random()*10);
        const y_cord_start = Math.floor(Math.random()*10);
        
        let x_cord_end;
        let y_cord_end;
        if(primaryAxisX){
            x_cord_end = x_cord_start;
            y_cord_end = y_cord_start + (ship_length-1) > 9 ? y_cord_start - (ship_length-1) : y_cord_start + (ship_length-1);
        } else{
            y_cord_end = y_cord_start;
            x_cord_end = x_cord_start + (ship_length-1) > 9 ? x_cord_start - (ship_length-1) : x_cord_start + (ship_length-1); 
        }

        return [{x_cord_start, y_cord_start},{x_cord_end, y_cord_end}];
    }

    logBoard(){
        console.log(this.board);
    }
    logShips(){
        console.log(this.ships);
    }

    #FillBoardSpaces(shipId, {x_cord_start, y_cord_start}, {x_cord_end, y_cord_end}){
        let x_cord_min = Math.min(x_cord_start, x_cord_end);
        let x_cord_max = Math.max(x_cord_start, x_cord_end);

        let y_cord_min = Math.min(y_cord_start, y_cord_end);
        let y_cord_max = Math.max(y_cord_start, y_cord_end);

        for(let i=x_cord_min; i<=x_cord_max;i++){
            this.board[i][y_cord_min]['shipId'] = shipId;
        }
        for(let i=y_cord_min; i<=y_cord_max;i++){
            this.board[x_cord_min][i]['shipId'] = shipId;
        }
    }
    #BoardSpacesAvailable({x_cord_start, y_cord_start}, {x_cord_end, y_cord_end}){
        let x_cord_min = Math.min(x_cord_start, x_cord_end);
        let x_cord_max = Math.max(x_cord_start, x_cord_end);

        let y_cord_min = Math.min(y_cord_start, y_cord_end);
        let y_cord_max = Math.max(y_cord_start, y_cord_end);

        for(let i=x_cord_min; i<x_cord_max;i++){
            if(!this.#SpaceIsAvailable({x_cord: i, y_cord: y_cord_min})){
                return false;
            }
        }
        for(let i=y_cord_min; i<y_cord_max;i++){
            if(!this.#SpaceIsAvailable({x_cord: x_cord_min, y_cord: i})){
                return false;
            }
        }

        return true;
    }

    #SpaceIsAvailable({x_cord, y_cord}){
        return this.board[x_cord][y_cord]['shipId'] === null ? true : false;
    }

}

export default Gameboard;