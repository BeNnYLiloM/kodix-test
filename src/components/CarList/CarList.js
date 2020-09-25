export class CarList {
  constructor(root, store) {
    this.$root = root;
    this.store = store;

    this.init();
  }

  init() {
    this.carList = document.createElement('div');
    this.carList.className = 'car-list';

    this.store.subscribe(() => this.create(), 'changeCarList');
  }

  create() {
    this.carListData = this.store.getState().carList;
    this.carList.innerHTML = this.createHtml();
    this.$root.append(this.carList);
  }

  createHtml() {
    return `
      <div class="container">
        <div class="block-title">АВТОМОБИЛИ В НАЛИЧИИ</div>
        <div class="table">
          <div class="table__header">
            <div class="table__row">
              <div class="item">Название</div>
              <div class="item">Год</div>
              <div class="item">Цвет</div>
              <div class="item">Статус</div>
              <div class="item">Цена</div>
              <div class="item"></div>
            </div>
          </div>
          <div class="table__body">
            ${this.createBody(this.carListData).join('')}
          </div>
        </div>
      </div>
    `;
  }

  createBody(data) {
    const lists = [];

    data.forEach(el => {
      lists.push(`${this.createRow(el)}`);
    });

    return lists;
  }

  createRow(item) {
    const { id, title, description, year, color, status, price } = item;

    return `
      <div class="table__row" data-car-id="${id}">
        <div class="item">
          <div>${title}</div>
          <div class="text-help">${description}</div>
        </div>
        <div class="item">${year}</div>
        <div class="item">${color}</div>
        <div class="item">${status}</div>
        <div class="item">${price}</div>
        <div class="item">
          <button class="btn btn-fill btn-fill-black">Удалить</button>
        </div>
      </div>
    `;
  }
}