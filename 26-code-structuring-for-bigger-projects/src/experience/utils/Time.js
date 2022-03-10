import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor(){
    super();

    // Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    // 16 ms usually at 60fps

    window.requestAnimationFrame(() => {
      // Call in the next frame because if not in
      // the first frame the delta will be 0 (possible bugs)
      this.tick();
    })
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger('tick');

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}