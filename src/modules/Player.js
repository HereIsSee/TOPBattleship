import Gameboard from "./Gameboard"

class Player{
    constructor(IsRealPlayer){
        this.gameboard = new Gameboard();
        this.isRealPlayer = IsRealPlayer;
    }
}