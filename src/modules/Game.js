import Ship from './Ship';
import Gameboard from './Gameboard';
import Player from './Player';

const Game = () =>{
    const container = document.querySelector('.container');
    const gameBoards = container.querySelector('.gameBoards');

    const player1 = new Player();
    const player2 = new Player();
    // If true: player1 turn. If false player2 turn
    let playerTurn = true;

    const play = function(){
        player1.gameboard.initiateShips();
        player2.gameboard.initiateShips();
        renderBoards();
    }
    const handleAttack = function (){
        const cell = this.parentElement;
        const board = cell.closest('table');
        const cellCords = cell.dataset.cords.split('-').map(Number);

        const player = board.id === "player1" ? player1 : player2;

        player.gameboard.receiveAttack({x_cord: cellCords[0], y_cord: cellCords[1]});

        renderBoards();
        // console.log(`${cell} element got hit!`);
        // console.log(`Board: ${board.id}`);
    }
    const renderBoards = function(){
        const board1 = createBoard('player1', player1);
        const board2 = createBoard('player2', player2);

        gameBoards.innerHTML = '';
        gameBoards.appendChild(board1);
        gameBoards.appendChild(board2);
    }
    const createBoard = function(boardId, player){
        const board = document.createElement('table');
        const caption = document.createElement('caption');
        caption.innerText = boardId;
        board.appendChild(caption);
        board.setAttribute('id', boardId);
        
        player.gameboard.board.forEach((rowData, index) =>{
            const row = createRow(rowData, index);
            board.appendChild(row);
        });

        return board;
    }
    const createRow = function(boardRow, rowIndex){
        const row = document.createElement('tr');

        boardRow.forEach((cellData, index) => {
            const cell = createCell(cellData.shipId, cellData.isHit, {x: rowIndex, y: index});
            row.appendChild(cell);
        });

        return row;
    }
    const createCell = function(shipId, isHit, {x, y}){
        const cell = document.createElement('td');
        cell.dataset.cords = `${x}-${y}`;

        if(x === 0 && y===0){
            console.log(`cords 0-0, isHit: ${isHit}`);

            console.log(`cords 0-0, shipId: ${shipId}`);
        }
        if(isHit){
            console.log("got here");
            cell.classList.add('hit');
        }
        if (shipId !== null) {
            cell.classList.add('ship');
            cell.dataset.shipId = shipId;
        }

        const button = document.createElement('button');
        // button.innerText = "hello";
        cell.appendChild(button);

        //adding an event listener so that cells can be hit
        button.addEventListener('click', handleAttack);
        
        return cell;
    }

    return {play};
};


export default Game;