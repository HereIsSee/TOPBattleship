import Ship from './Ship';
import Gameboard from './Gameboard';
import Player from './Player';

const Game = () =>{
    const container = document.querySelector('.container');
    const gameBoards = container.querySelector('.gameBoards');
    const toggleCurrentPlayersBoard = container.querySelector('#toggleYourBoard');
    const turnMessage = container.querySelector('.turnMessage');
    const otherMessage = container.querySelector('.otherMessage');

    const player1 = new Player();
    const player2 = new Player();
    // If true: player1 turn. If false player2 turn
    let playerTurn = true;

    const play = function(){
        player1.gameboard.initiateShips();
        player2.gameboard.initiateShips();

        renderBoards();
        toggleTurnMessage();
    }
    const handleAttack = function (){
        const cell = this.parentElement;
        const attackedBoard = cell.closest('table');
        const cellCords = cell.dataset.cords.split('-').map(Number);

        // Check if attack coresponds with playerTurn
        if((playerTurn && attackedBoard.id !== "player2") || (!playerTurn && attackedBoard.id !== "player1")){
            setOtherMessage(`It's currently player${playerTurn ? "1" : "2"} turn`);
            return;
        }

        const attackedPlayer = attackedBoard.id === "player1" ? player1 : player2;
        const attackSucceeded = attackedPlayer.gameboard.receiveAttack({x_cord: cellCords[0], y_cord: cellCords[1]});
        const attackedCellContainsShip = attackedPlayer.gameboard.cellContainsShip({x: cellCords[0], y: cellCords[1]});

        if(!attackSucceeded){
            setOtherMessage('You have already attacked this square!');
            return;
        }
        
        if(attackedPlayer.gameboard.allShipsSunk()){
            setOtherMessage(`<span class="winMessage"> Player${playerTurn ? "1" : "2"} has won!!! </span>`);
            renderBoards();
            return;
        }
        if(!attackedCellContainsShip){
            playerTurn = !playerTurn;
            
        }

        renderBoards();
        toggleTurnMessage();
        setOtherMessage('');
    }
    const renderBoards = function(){
        const board1 = createBoard('player1', player1);
        const board2 = createBoard('player2', player2);

        if(playerTurn){
            board1.classList.add('inactive', 'shipsHidden');
            board2.classList.add('shipsHidden');
        } else{
            board2.classList.add('inactive', 'shipsHidden');
            board1.classList.add('shipsHidden');
        }
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

        if(isHit){
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

    const setOtherMessage = function(message){
        otherMessage.innerHTML = message;
    }
    const toggleTurnMessage = function(){
        turnMessage.innerHTML = `<span class="highlight"> Player${playerTurn ? "1" : "2"} </span> make your move!`;
    }
    const toggleYourBoard = function(){
        const currentPlayerBoardId = playerTurn ? 'player1' : 'player2';
        const currentPlayerBoard = container.querySelector(`#${currentPlayerBoardId}`);

        if(currentPlayerBoard.classList.contains('shipsHidden')){
            currentPlayerBoard.classList.remove('shipsHidden');
        } else{
            currentPlayerBoard.classList.add('shipsHidden');
        }
    }

    toggleCurrentPlayersBoard.addEventListener('click', toggleYourBoard);

    return {play};
};


export default Game;