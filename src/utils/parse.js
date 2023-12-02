import { PAGES, PARAGRAPHS } from "./constants";
/**
 * convert no paragraph novel string into pages
 * @param {string} txt novel text
 * @param {bool} isMobile
 * @returns {object} { detail: [], type: pages }
 */
const convertNovel2Pages = (txt, isMobile = false) => {
  const txtLen = txt.length;
  const pages = [];
  // The mobile displays 50 per page, and PC displays 500 per page
  const textNumber = isMobile ? 50 : 500;
  const pageLen = Math.ceil(txtLen / textNumber);
  for (let i = 0; i < pageLen; i++) {
    // TODO handle \n and others
    const current = txt.slice(i * textNumber, i * textNumber + textNumber);
    pages.push(current);
  }
  return {
    detail: pages,
    type: PAGES,
  };
};

/**
 * convert novel string into paragraphs
 * By default, the chapter is complete and there is no omission
 * @param {string} txt novel text
 * @returns {object} { detail: [], type: paragraphs }
 */
const convertNovel2Paragraph = (txt) => {
  let paragraphs = txt.split(/第\s*\d+\s*章/g);
  paragraphs = paragraphs.filter((item) => item.length);
  return {
    detail: paragraphs,
    type: PARAGRAPHS,
  };
};

/**
 * Check whether there are chapters in the novel
 * @param {string} detail novel text
 * @returns boolean
 */
const checkParaGraph = (detail) => {
  return detail.search(/第\s*\d+\s*章/g) > -1;
};

/**
 * Convert novel tex
 * @param {string} detail novel text
 * @returns object
 */
const parseNovel = (detail) => {
  if (typeof detail !== "string") {
    return {};
  }
  if (checkParaGraph(detail)) {
    return convertNovel2Paragraph(detail);
  } else {
    return convertNovel2Pages(detail);
  }
};

export {
  convertNovel2Pages,
  convertNovel2Paragraph,
  checkParaGraph,
  parseNovel,
};
