export class DelayToken {
  private _delay: number = 0;
  get delay(): number {
      return this._delay;
  }
  set(delay: number) {
      this._delay = delay;
  }
}
