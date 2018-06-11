import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chronometer } from '../Models/Chronometer/chronometer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private iterations = new BehaviorSubject(0);
  currentIterations = this.iterations.asObservable();

  private alive = new BehaviorSubject(0);
  currentAlive = this.alive.asObservable();

  private delayBetweenFrames = new BehaviorSubject(0);
  currentDelayBetweenFrames = this.delayBetweenFrames.asObservable();

  public chronometer = new Chronometer();

  constructor() { }

  changeIterations(iterations: number) {
    this.iterations.next(iterations);
  }

  changeAlive(alive: number) {
    this.alive.next(alive);
  }

  changeDelayBetweenFrames(delayBetweenFrames: number) {
    this.delayBetweenFrames.next(delayBetweenFrames);
  }

}
