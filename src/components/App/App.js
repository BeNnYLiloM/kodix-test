import { Header } from '../Header/Header';
import { AddCar } from '../AddCar/AddCar';
import { CarList } from '../CarList/CarList';
import { Footer } from '../Footer/Footer';
import { createStore } from '../../store/createStore';
import { initialState } from '../../redux/initialState';
import { rootReducer } from '../../redux/rootReducer';
import { CAR_LIST_URL } from '../../constants';
import { addCarList } from '../../redux/actions';

export class App {
  constructor(selector) {
    this.$root = document.getElementById(selector);

    this.init();
  }

  init() {
    let store = createStore(rootReducer, initialState);
    const components = [Header, AddCar, CarList, Footer];

    fetch(CAR_LIST_URL)
      .then(response => response.json())
      .then(data => {
        store.dispatch(addCarList(data), 'changeCarList');
      });

    this.components = components.map(Component => new Component(this.$root, store));

    this.components.forEach(Component => Component.create());
  }
}