export class AddCar {
  constructor(root) {
    this.$root = root;

    this.init();
  }

  init() {
    this.addCar = document.createElement('div');
    this.addCar.className = 'add-car';
  }

  create() {
    this.addCar.innerHTML = this.createHtml();
    this.$root.append(this.addCar);
  }

  createHtml() {
    return `
      <div class="container">
        <div class="add-car__title h1">¡Ay caramba!</div>
        <div class="form" id="add_car">
          <form>
            <div class="form__line">
              <div class="form__item">
                <input type="text" name="name" />
                <div class="form__label">Название</div>
              </div>
              <div class="form__item">
                <input type="text" name="year" />
                <div class="form__label">Год</div>
              </div>
              <div class="form__item">
                <input type="text" name="price" />
                <div class="form__label">Цена</div>
              </div>
            </div>
            <div class="form__line">
              <input type="text" name="description" />
              <div class="form__label">Описание</div>
            </div>
            <div class="form__line">
              <div class="form__item">
                <div class="form__colors">
                  <label class="item" style="background-color: #ffffff;">
                    <input type="radio" name="car-color" value="#ffffff" />
                    <div class="check"></div>
                  </label>
                  <label class="item" style="background-color: #000000;">
                    <input type="radio" name="car-color" value="#000000" />
                    <div class="check"></div>
                  </label>
                  <label class="item" style="background-color: #C4C4C4;">
                    <input type="radio" name="car-color" value="#C4C4C4" />
                    <div class="check"></div>
                  </label>
                  <label class="item" style="background-color: #DD1C10;">
                    <input type="radio" name="car-color" value="#DD1C10" />
                    <div class="check"></div>
                  </label>
                  <label class="item" style="background-color: #77CF61;">
                    <input type="radio" name="car-color" value="#77CF61" />
                    <div class="check"></div>
                  </label>
                </div>
              </div>
              <div class="form__item">
                <select placeholder="Статус">
                  <option value="В наличии">В наличии</option>
                  <option value="Ожидается">Ожидается</option>
                  <option value="Нет в наличии">Нет в наличии</option>
                </select>
              </div>
              <div class="form__item">
                <button type="submit">
                  Отправить
                  <div class="arrow"></div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}