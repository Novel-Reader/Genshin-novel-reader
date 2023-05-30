import EventBus from '../../utils/event-bus';

test("event bus", () => {
  let eventBus = new EventBus();
  let result = 0;
  const add = (a, b) => {
    result = a + b;
  }
  const KEY = 'onclick';
  eventBus.subscribe(KEY, add);
  eventBus.dispatch(KEY, 1, 2);
  expect(result).toBe(3);
});

