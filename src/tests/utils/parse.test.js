import {
  convertNovel2Pages,
  convertNovel2Paragraph,
  checkParaGraph,
  parseNovel,
} from "../../utils/parse";
import { loadExample } from "../../utils/index";
import { PAGES, PARAGRAPHS } from "../../utils/constants";

const files = loadExample();

test("parse txt to pages", () => {
  let result = convertNovel2Pages(files[0].detail);
  expect(typeof result).toBe("object");
  expect(result.type).toBe(PAGES);
  expect(result.detail.length > 0).toBe(true);
});

test("parse txt to paragraphs", () => {
  let result = convertNovel2Paragraph(files[2].detail);
  expect(typeof result).toBe("object");
  expect(result.type).toBe(PARAGRAPHS);
  expect(result.detail.length > 0).toBe(true);
});

test("check novel has paragraph", () => {
  expect(checkParaGraph(files[0].detail)).toBe(false);
  expect(checkParaGraph(files[2].detail)).toBe(true);
});

test("parse txt to novel", () => {
  let result = parseNovel(files[0].detail);
  expect(typeof result).toBe("object");
  expect(result.type).toBe(PAGES);
  expect(result.detail.length > 0).toBe(true);
});
