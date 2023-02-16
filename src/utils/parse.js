/**
 * convert no paragraph novel string into pages
 * @param {string} txt novel text 
 * @param {bool} isMobile 
 * @returns {object} { context: [], type: pages }
 */
const convertNovel2Pages = (txt, isMobile = false) => {
  const txtLen = txt.length;
  const pages = [];
  // The mobile displays 50 per page, and PC displays 500 per page
  const textNumber = isMobile ? 50 : 500;
  const pageLen = Math.ceil(txtLen / textNumber);
  for (let i = 0; i < pageLen; i++) {
    // TODO handle \n and others
    let current = txt.slice(i * textNumber, i * textNumber + textNumber);
    pages.push(current);
  }
  return {
    context: pages,
    type: 'pages',
  };
};

/**
 * convert novel string into paragraphs
 * By default, the chapter is complete and there is no omission
 * @param {string} txt novel text 
 * @returns {object} { context: [], type: 'paragraphs' }
 */
const convertNovel2Paragraph = (txt) => {
  let paragraphs = txt.split(/第\s*\d+\s*章/g);
  paragraphs = paragraphs.filter((item) => item.length);
  return {
    context: paragraphs,
    type: 'paragraphs',
  };
};

/**
 * Check whether there are chapters in the novel
 * @param {string} content novel text 
 * @returns boolean
 */
const checkParaGraph = (content) => {
  return content.search(/第\s*\d+\s*章/g) > -1;
};

/**
 * Convert novel tex
 * @param {string} content novel text
 * @returns object
 */
const parseNovel = (content) => {
  if (typeof content !== 'string') {
    return {};
  }
  if (checkParaGraph(content)) {
    return convertNovel2Paragraph(content);
  } else {
    return convertNovel2Pages(content);
  }
};

export { convertNovel2Pages, convertNovel2Paragraph, checkParaGraph, parseNovel };
