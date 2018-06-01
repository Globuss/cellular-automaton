export class Chronometer {

    private _minutes: number = 0;
    private _secondes: number = 0;
    private _totalSecondes: number = 0;
    private _timer;

    get minutes(): number {
        return this._minutes;
    }

    get secondes(): number {
        return this._secondes;
    }

    start() {
        const start = new Date().getTime();

        this._timer = setInterval(() => {
            this._totalSecondes = (new Date().getTime() - start) / 1000;
            this._minutes = Math.floor(++this._totalSecondes / 60);
            this._secondes = Math.round(this._totalSecondes - this._minutes * 60);
        }, 1000);

    }

    stop() {
      clearInterval(this._timer);
    }

    reset() {
      this._totalSecondes = this._minutes = this._secondes = 0;
    }

}
