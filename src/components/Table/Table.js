import { addCarList } from "../../redux/actions";

export class Table {
  constructor(root, data, store) {
    this.$root = root;
    this.data = data;
    this.store = store;

    this.init();
  }

  init() {
    this.table = document.createElement('div');
    this.table.className = 'table-wrap';

    this.deleteItem = this.deleteItem.bind(this);
    this.table.addEventListener('click', this.deleteItem);

    this.store.subscribe(() => this.create(), 'changeCarList');
  }

  deleteItem(event) {
    const {type} = event.target.dataset;
    const itemId = +event.target.closest('.table__row').dataset.carId;
    const carList = this.store.getState().carList;

    if (type === 'delete-item') {
      carList.forEach((el, index) => {
        if (el.id === itemId) {
          carList.splice(index, 1);
        }
      });

      this.store.dispatch(addCarList(carList), 'changeCarList');
    }
  }

  create() {
    this.carListData = this.store.getState().carList;
    this.table.innerHTML = this.createHtml();
    this.$root.append(this.table);
  }

  createHtml() {
    return `
      <div class="table">
        <div class="table__header">
          <div class="table__row">
            <div class="item name">Название</div>
            <div class="item year">Год</div>
            <div class="item color">Цвет</div>
            <div class="item status">Статус</div>
            <div class="item price">Цена</div>
            <div class="item delete">&nbsp;</div>
          </div>
        </div>
        <div class="table__body">
          ${this.createBody(this.carListData).join('')}
        </div>
      </div>
    `;
  }

  createBody(data) {
    const lists = [];

    if (data.length === 0) {
      lists.push(`<div class="empty">Список пуст</div>`)
    } else {
      data.forEach(el => {
        lists.push(`${this.createRow(el)}`);
      });
    }

    return lists;
  }

  createRow(item) {
    const { id, title, description, year, color, status, price } = item;
    let clsColor = '';

    if (color === 'white' || color === '#fff' || color === '#ffffff') {
      clsColor = '_light-color';
    }

    return `
      <div class="table__row" data-car-id="${id}">
        <div class="item name">
          <div class="title">${title}</div>
          <div class="text-help">${description}</div>
        </div>
        <div class="item year">${year}</div>
        <div class="item color ${clsColor}">
          <div style="background: ${color}"></div>
        </div>
        <div class="item status">${status}</div>
        <div class="item price">${price} руб.</div>
        <div class="item delete">
          <button class="btn btn-fill btn-fill-black" data-type="delete-item">Удалить</button>
        </div>
      </div>
    `;
  }
}