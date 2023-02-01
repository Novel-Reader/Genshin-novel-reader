import { convertNovel2Pages } from '../../utils/parse';
import { loadExample } from '../../utils/index';

const files = loadExample();

test("parse txt to pages", () => {
  let result = convertNovel2Pages(files[0].context, false);
  expect(typeof result).toBe('object');
  expect(result.type).toBe('pages');
  expect(result.context.length > 0).toBe(true);
});
