import logo from '../../assets/imgs/logo.png';

export class Header {
  constructor(root) {
    this.$root = root;

    this.init();
  }

  init() {
    this.header = document.createElement('div');
    this.header.className = 'header';
  }

  create() {
    this.header.innerHTML = this.createHtml();
    this.$root.append(this.header);
  }

  createHtml() {
    return `
      <div class="logo">
        <img src="${logo}" alt="" />
      </div>
    `;
  }
}