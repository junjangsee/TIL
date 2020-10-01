class Router {
  nowPage = '';

  constructor({ pages }) {
    this.app = document.getElementById('app');

    window.onhashchange = () => {
      this.pages = pages;
      this.nowPage = window.location.hash.replace('#', '');

      const page = this.pages.find((page) => page.path === this.nowPage);
      const Page = page.page;
      const currentPage = new Page({ router: this });
      this.app.innerHTML = '';
      this.app.innerHTML += currentPage.render();
      currentPage.mount();
    };
  }

  push(pageName) {
    window.location.hash = pageName;
  }

  replace(pageName) {
    window.location.replace(`${window.location.origin}#${pageName}`);
  }
}

module.exports = Router;
