import { convertNovel2Pages, convertNovel2Paragraph, checkParaGraph, parseNovel } from '../../utils/parse';
import { loadExample } from '../../utils/index';

const files = loadExample();

test("parse txt to pages", () => {
  let result = convertNovel2Pages(files[0].context);
  expect(typeof result).toBe('object');
  expect(result.type).toBe('pages');
  expect(result.context.length > 0).toBe(true);
});

test("parse txt to paragraphs", () => {
  let result = convertNovel2Paragraph(files[2].context);
  expect(typeof result).toBe('object');
  expect(result.type).toBe('paragraphs');
  expect(result.context.length > 0).toBe(true);
});

test("check novel has paragraph", () => {
  expect(checkParaGraph(files[0].context)).toBe(false);
  expect(checkParaGraph(files[2].context)).toBe(true);
});

test("parse txt to novel", () => {
  let result = parseNovel(files[0].context);
  expect(typeof result).toBe('object');
  expect(result.type).toBe('pages');
  expect(result.context.length > 0).toBe(true);
});
