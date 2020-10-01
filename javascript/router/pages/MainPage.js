class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  mount() {
    const button = document.querySelector('.main-button');
    button.addEventListener('click', () => {
      this.router.push('other');
    });
  }

  render() {
    return `<span>메인 페이지</span>
            <button type="button" class="main-button">Other Page</button>
            `;
  }
}

module.exports = MainPage;
