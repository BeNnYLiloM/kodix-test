import { addCarList } from '../../redux/actions';
import { CustomSelect } from '../CustomSelect/CustomSelect'

export class Form {
  constructor(root, store) {
    this.$root = root;
    this.store = store;
  }

  init() {
    this.formWrap = document.createElement('div');
    this.formWrap.className = 'form';
    this.formWrap.innerHTML = this.createHtml();
    this.form = this.formWrap.querySelector('#add_car');

    this.handlerForm = this.handlerForm.bind(this);

    this.form.addEventListener('submit', this.handlerForm);

    const inputs = this.formWrap.querySelectorAll('.form__input');
    const customSelects = this.formWrap.querySelectorAll('.custom-select');
    const formItems = this.formWrap.querySelectorAll('.form__item');

    inputs.forEach(input => {
      input.addEventListener('keyup', event => {
        let parent = event.target.closest('.form__item');

        if (event.target.value !== '') {
          parent.classList.add('_inputed');
        } else {
          parent.classList.remove('_inputed');
        }
      });
    });

    formItems.forEach(item => {
      item.addEventListener('click', (event) => {
        const th = event.target.closest('.form__item');

        if (th) {
          th.classList.remove('_error');
        }
      });
    })

    customSelects.forEach(select => {
      new CustomSelect(select);
    });

    this.$root.append(this.formWrap);
  }

  handlerForm(event) {
    event.preventDefault();
  
    const {name, year, price, description, carColor, status} = event.target.elements;

    if (name.value === '') {
      this.formError(name.closest('.form__item'));
    }
    if (year.value === '') {
      this.formError(year.closest('.form__item'));
    }
    if (price.value === '') {
      this.formError(price.closest('.form__item'));
    }
    if (carColor.value === '') {
      const formItem = document.querySelector('.form__colors').closest('.form__item');
      this.formError(formItem);
    }
    if (status.options.selectedIndex === 0) {
      this.formError(status.closest('.form__item'));
    }

    if (!this.form.classList.contains('_error')) {
      const carList = this.store.getState().carList;
      const id = carList[carList.length - 1] ? carList[carList.length - 1].id + 1 : 1;
      const newCar = {
        id: id,
        title: name.value,
        year: year.value,
        price: price.value,
        description: description.value,
        color: carColor.value,
        status: status.value
      }

      carList.push(newCar);
      this.store.dispatch(addCarList(carList), 'changeCarList');
    }
  }

  formError(element) {
    element.classList.add('_error');
    this.form.classList.add('_error');
  }

  createHtml() {
    return `
      <div class="container">
        <form id="add_car">
          <div class="form__line">
            <div class="form__item">
              <input type="text" name="name" class="form__input" />
              <div class="form__label">Название</div>
              <div class="form__error">Заполните поле</div>
            </div>
            <div class="form__item">
              <input type="text" name="year" class="form__input" />
              <div class="form__label">Год</div>
              <div class="form__error">Заполните поле</div>
            </div>
            <div class="form__item">
              <input type="text" name="price" class="form__input" />
              <div class="form__label">Цена</div>
              <div class="form__error">Заполните поле</div>
            </div>
          </div>
          <div class="form__line">
            <div class="form__item">
              <input type="text" name="description" class="form__input" />
              <div class="form__label">Описание</div>
              <div class="form__error">Заполните поле</div>
            </div>
          </div>
          <div class="form__line">
            <div class="form__item form__colors">
              <label class="item" style="background-color: #ffffff;">
                <input type="radio" name="carColor" value="#ffffff" />
                <div class="check"></div>
              </label>
              <label class="item" style="background-color: #000000;">
                <input type="radio" name="carColor" value="#000000" />
                <div class="check"></div>
              </label>
              <label class="item" style="background-color: #C4C4C4;">
                <input type="radio" name="carColor" value="#C4C4C4" />
                <div class="check"></div>
              </label>
              <label class="item" style="background-color: #DD1C10;">
                <input type="radio" name="carColor" value="#DD1C10" />
                <div class="check"></div>
              </label>
              <label class="item" style="background-color: #77CF61;">
                <input type="radio" name="carColor" value="#77CF61" />
                <div class="check"></div>
              </label>
              <div class="form__label">Цвет</div>
              <div class="form__error">Выберите цвет</div>
            </div>
            <div class="form__item">
              <select class="custom-select" name="status" placeholder="Статус">
                <option disabled selected hidden>Статус</option>
                <option value="В наличии">В наличии</option>
                <option value="Ожидается">Ожидается</option>
                <option value="Нет в наличии">Нет в наличии</option>
              </select>
              <div class="form__error">Выберите один из пунктов</div>
            </div>
            <div class="form__item">
              <button class="form__submit" type="submit">
                Отправить
                <div class="arrow"></div>
              </button>
            </div>
          </div>
        </form>
      </div>
    `
  };
}