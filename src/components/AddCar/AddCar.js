import { Form } from '../Form/Form';

export class AddCar {
  constructor(root, store) {
    this.$root = root;
    this.store = store;

    this.init();
  }

  init() {
    this.addCar = document.createElement('div');
    this.addCar.className = 'add-car';
  }

  create() {
    this.addCar.innerHTML = this.createHtml();
    this.$root.append(this.addCar);

    const form = new Form(this.addCar, this.store);
    form.init();
  }

  createHtml() {
    return `
      <div class="container">
        <div class="add-car__title h1">¡Ay caramba!</div>
      </div>
    `;
  }
}