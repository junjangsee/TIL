const MainPage = require('./pages/MainPage');
const OtherPage = require('./pages/OtherPage');
const Router = require('./Router');

const pages = [
  { page: MainPage, path: 'main' },
  { page: OtherPage, path: 'other' },
];

const router = new Router({ pages });
router.push('main');
