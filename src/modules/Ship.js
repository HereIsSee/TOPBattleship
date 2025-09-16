class Ship{
    constructor(length){
        if(length < 1){
            throw new Error("Ship must be at least of lenght 1")
        }

        this.length = length;
        this.times_hit = 0;
        this.sunk = false;
    }

    hit(){
        if(this.length === this.times_hit){
            return;
        }
        this.times_hit+=1;
    }

    isSunk(){
        if(this.times_hit === this.length){
            this.sunk = true;
        }
        
        return this.sunk; 
    }
}

export default Ship;