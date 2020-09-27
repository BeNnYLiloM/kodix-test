import { Table } from '../Table/Table';

export class CarList {
  constructor(root, store) {
    this.$root = root;
    this.store = store;

    this.init();
  }

  init() {
    this.$carList = document.createElement('div');
    this.$carList.className = 'car-list';
  }

  create() {
    this.$carList.innerHTML = this.createHtml();
    this.$root.append(this.$carList);

    const tableRoot = this.$carList.querySelector('.container');

    this.table = new Table(tableRoot, this.carListData, this.store);
    this.table.create();
  }

  createHtml() {
    return `
      <div class="container">
        <div class="block-title">АВТОМОБИЛИ В НАЛИЧИИ</div>
      </div>
    `;
  }
}