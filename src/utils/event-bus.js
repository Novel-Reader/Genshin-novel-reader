export default class EventBus {

  eventMap = {};

  subscribe(key, fn) {
    if (!this.eventMap[key]) {
      this.eventMap[key] = [];
    }
    this.eventMap[key].push(fn);
  }

  dispatch(key, ...params) {
    let fns = this.eventMap[key];
    if (fns) {
      fns.forEach(fn => {
        fn(...params);
      });
    }
  }
}
