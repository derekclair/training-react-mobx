/* eslint-disable */

import autoBind from 'react-autobind';
import {
  action,
  observable,
} from 'mobx';

export class Store {
  constructor() {
    // super();
    autoBind(this);

    // this.counter = 0;
  }

  @observable counter = 0;
  // @observable counter;

  @action
  increment() {
    console.log('Store.increment()');
    this.counter++;

  }

  @action
  decrement() {
    console.log('Store.decrement');
    this.counter--;
  }
}


export default new Store();