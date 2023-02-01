import { isSameObject } from '../../utils/index';

test("common utils function", () => {
  expect(isSameObject(null, null)).toBe(false);
  expect(isSameObject({a: 10}, null)).toBe(false);
  expect(isSameObject({a: 10}, {a: 10})).toBe(true);
});
