
// Grid model is an extended array prototype to implement a grid
// Which structured [row][columns].
// This model can also check and return the total live nighborhood cells in a grid
export class Grid extends Array  {
    constructor(private _rows: number, private _columns: number) {
        super();
        Object.setPrototypeOf(this, Grid.prototype);
        this._build();
    }

    get getRows(){
        return this._rows;
    }

    get getColumn(){
        return this._columns;
    }

    set setRows(rows){
        this._rows = rows;
    }

    set setColumn(columns){
        this._columns = columns;
    }

    _build() {
        for (let i = 0; i < this._rows; i++) {
            this[i] = [];
        }
    }
 
    // check surronding cells left & right
    checkSituationCells(row, column, rule){
        let situation = 0;

        situation += (this[row - 1][column - 1] || 0); // top left
        situation += (this[row] - 1[column] || 0) * 2; // top
        situation += (this[row - 1][column + 1] || 0) * 4; // top right
        situation += (this[row][column - 1] || 0) * 8; // middle left
        situation += (this[row][column] || 0) * 16; // middle
        situation += (this[row][column + 1] || 0) * 32; // middle right
        situation += (this[row + 1][column - 1] || 0) * 64; // bottom left
        situation += (this[row + 1][column] || 0) * 128; // bottom 
        situation += (this[row + 1][column + 1] || 0) * 256; // bottom right

        return rule[situation];
        
    }


}
