export class CustomSelect {
  constructor(select) {
    this.select = select;
    this.$root = select.closest('div');
    this.$elements = select.querySelectorAll('option');
    this.$selected = select.querySelector('option[selected]') || '';
    this.placeholder = select.getAttribute('placeholder') || 'Выберите...';

    this.init();
  }

  init() {
    this.select.style.display = 'none';

    this.wrap = document.createElement('div');
    this.wrap.innerHTML = this.createHTML(this.$elements);
    this.clickHandler = this.clickHandler.bind(this);
    this.wrap.addEventListener('click', this.clickHandler);

    this.$customSelect = this.wrap.querySelector('.custom-select');
    this.$itemList = this.$customSelect.querySelectorAll('[data-type="item"]');
    this.$selectedFiled = this.$customSelect.querySelector('[data-type="selected"]');

    this.$root.append(this.wrap);

    document.addEventListener('mouseup', event => {
      if (!event.target.closest('.custom-select._open')) {
        this.close();
      }
    });
  }

  clickHandler(event) {
    const {type} = event.target.dataset;

    if (type === 'selected') {
      this.toggle();
    }
    if (type === 'item') {
      this.selectItem(event.target);
    }
  }

  get isOpen() {
    return this.$customSelect.classList.contains('_open');
  }

  selectItem(item) {
    this.$selectedFiled.textContent = item.textContent;

    this.$elements.forEach(element => {
      if (element.value === item.dataset.value) {
        element.selected = true;
        element.click();
      }
    });

    this.$customSelect.classList.add('_selected');
    this.$itemList.forEach(item => item.classList.remove('_selected'));
    item.classList.add('_selected');
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$customSelect.classList.add('_open');
  }

  close() {
    this.$customSelect.classList.remove('_open');
  }

  createHTML(data) {
    const list = [];
    
    data.forEach((item, index) => {
      if (index !== 0) {
        let cls = '';

        if (item.value === this.$selected.value) {
          this.placeholder = item.text;
          cls = '_selected';
        }

        list.push(`<div class="item ${cls}" data-type="item" data-value="${item.value}">${item.text}</div>`);
      }
    });

    return `
      <div class="custom-select" name="test">
        <div class="custom-select__selected" data-type="selected">
          ${this.placeholder}
        </div>
        <div class="custom-select__dropdown">
          ${list.join('')}
        </div>
      </div>
    `
  }
}