import { GridFiller } from "./gridfiller";
import { CenterGridFiller } from "./FullGridFiller/centergridfiller";
import { RandomGridFiller } from "./FullGridFiller/randomgridfiller";
import { CrossGridFiller } from "./FullGridFiller/crossgridfiller";
import { GliderFiller } from "./GameOfLife/glider";
import { LoafFiller } from "./GameOfLife/loaf";
import { GridLinesFiller } from "./FullGridFiller/gridlinesfiller";
import { GunFiller } from "./GameOfLife/gun";


export function getFiller(fillerName: string) : GridFiller {
    let list = {};

    // All full grid fillers
    list["center"] = new CenterGridFiller();
    list["random"] = new RandomGridFiller();
    list["gridlines"] = new GridLinesFiller();
    list["cross"] = new CrossGridFiller();

    // All Game of Life fillers
    list["glider"] = new GliderFiller();
    list["loaf"] = new LoafFiller();
    list["gun"] = new GunFiller();

    return list[fillerName];
}