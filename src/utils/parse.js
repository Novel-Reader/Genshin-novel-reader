/**
 * convert no paragraph novel string into pages
 * @param {string} name novel name 
 * @param {string} txt novel text 
 * @param {bool} isMobile 
 * @returns {object} { context: [], type: 'pages' }
 */
const convertNovel2Pages = (txt, isMobile = false) => {
  const txtLen = txt.length;
  const pages = [];
  const textNumber = isMobile ? 50 : 500;
  const pageLen = Math.ceil(txtLen / textNumber);
  for (let i = 0; i < pageLen; i++) {
    // TODO handle \n and others
    let current = txt.slice(i * textNumber, i * textNumber + textNumber);
    pages.push(current);
  }
  return {
    context: pages,
    type: "pages",
  };
};

export { convertNovel2Pages };
