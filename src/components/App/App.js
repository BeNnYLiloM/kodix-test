import {CarListApp} from '../../core/CarListApp';
import { Header } from '../Header/Header';
import { AddCar } from '../AddCar/AddCar';
import { CarList } from '../CarList/CarList';
import { createStore } from '../../store/createStore';
import { initialState } from '../../redux/initialState';
import { rootReducer } from '../../redux/rootReducer';
import { CAR_LIST_URL } from '../../constants';
import { ADD_CAR_LIST } from '../../redux/actionTypes';
import { addCarList } from '../../redux/actions';

export class App {
  constructor(selector) {
    this.$root = document.getElementById(selector);

    this.init();
  }

  init() {
    let store = createStore(rootReducer, initialState);

    fetch(CAR_LIST_URL)
      .then(response => response.json())
      .then(data => {
        store.dispatch(addCarList(data), 'changeCarList');
      });

    this.carListApp = new CarListApp({
      components: [Header, AddCar, CarList],
      root: this.$root,
      store
    });

    this.carListApp.init();
  }
}