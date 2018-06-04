import { Grid } from '../Grid/grid';

export abstract class GridFiller {

    _id: number;
    _name: string;
    grid: Grid;
    static latestId: number = 1;
    static gridFillers: Array<GridFiller> = Array(0);

    constructor() {
        GridFiller.gridFillers.push(this);
    }

    setGrid(grid: Grid) {
        this.grid = grid;
    }

    public abstract fill();

    static getAll() {
        return GridFiller.gridFillers;
    }

    static getById(id: number) {
        let res = null;
        for ( let i = 0; i < GridFiller.gridFillers.length; i++ ) {
            if ( GridFiller.gridFillers[i].id === id) {
                res = GridFiller.gridFillers[i];
                break;
            }
        }
        return res;
    }

    static getByName(name: string) {
        let res = null;
        for (let i = 0; i < GridFiller.gridFillers.length; i++) {
            if (GridFiller.gridFillers[i].name === name) {
                res = GridFiller.gridFillers[i];
                break;
            }
        }
        return res;
    }

    static incrementId() {
        if (!GridFiller.latestId) GridFiller.latestId = 1
        else GridFiller.latestId++
        return GridFiller.latestId
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

}
