const FONT_SIZES = [
  { value: "12px", label: "12px" },
  { value: "16px", label: "16px" },
  { value: "20px", label: "20px" },
  { value: "24px", label: "24px" }
];

const FONT_FAMILYS = [
  { value: "Segoe UI", label: "Segoe UI" },
  { value: "Roboto", label: "Roboto" },
  { value: "Helvetica Neue", label: "Helvetica Neue" },
  { value: "Arial", label: "Arial" }
];

const FONT_WEIGHTS = [
  { value: "normal", label: "normal" },
  { value: "bold", label: "bold" },
  { value: "bolder", label: "bolder" },
  { value: "lighter", label: "lighter" },
  { value: 100, label: "100" },
  { value: 200, label: "200" },
  { value: 300, label: "300" },
  { value: 400, label: "400" },
  { value: 500, label: "500" },
  { value: 600, label: "600" },
  { value: 700, label: "700" },
  { value: 800, label: "800" },
  { value: 900, label: "900" }
];

const LINE_HEIGHTS = [
  { value: 1, label: "1" },
  { value: 1.5, label: "1.5" },
  { value: 2, label: "2" },
  { value: 2.5, label: "2.5" },
  { value: 3, label: "3" }
];

const OPACITIES = [
  { value: 0.5, label: "0.5" },
  { value: 0.6, label: "0.6" },
  { value: 0.7, label: "0.7" },
  { value: 0.8, label: "0.8" },
  { value: 0.9, label: "0.9" },
  { value: 1.0, label: "1.0" },
];

const DEFAULT_STYLE = {
  fontSize: "16px",
  color: "#212529",
  backgroundColor: "rgb(251, 246, 236)"
};

const PAGES = 'pages';
const PARAGRAPHS = 'paragraphs';
const FULLSCREEN = 'fullscreen';
const DEFAULT_IMAGE = "https://julia-1994.github.io/images/KamisatoAyaka/02.jpg";

const UPLOAD_FILE_TYPES = [
  'txt',
  'md',
  'c',
  'css',
  'js',
  'py',
];

// handle input accept file types
const INPUT_ACCEPT_FILE_TYPE = UPLOAD_FILE_TYPES.map(item => '.' + item).join(',');

export {
  INPUT_ACCEPT_FILE_TYPE,
  UPLOAD_FILE_TYPES,
  FONT_SIZES,
  FONT_FAMILYS,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  OPACITIES,
  DEFAULT_STYLE,
  PAGES,
  PARAGRAPHS,
  FULLSCREEN,
  DEFAULT_IMAGE,
};
