class OtherPage {
  constructor({ router }) {
    this.router = router;
  }

  mount() {
    const button = document.querySelector('.other-button');
    button.addEventListener('click', () => {
      this.router.push('main');
    });
  }

  render() {
    return `<span>다른 페이지</span>
            <button type="button" class="other-button">Main Page</button>
            `;
  }
}

module.exports = OtherPage;
