export class Footer {
  constructor(root) {
    this.$root = root;

    this.init()
  }

  init() {
    this.footer = document.createElement('div');
    this.footer.className = 'footer';
  }

  create() {
    this.footer.innerHTML = this.createHtml();
    this.$root.appendChild(this.footer);
  }

  createHtml() {
    return `
      <div class="container">
        <div class="footer__wrap">
          <div>© 2020 CAPTAIN QUACK</div>
          <div>Десница тысячелетия и моллюск!</div>
        </div>
      </div>
    `
  }
}