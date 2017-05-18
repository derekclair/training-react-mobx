/* eslint-disable */

import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { observable, peek, toJS } from 'mobx';

import { Store } from './store.js';

import './App.css';

// const mapStoreToProps = ({ store }) => ({ ...store });
const mapStoreToProps = ({ store: { counter, increment, decrement } }, props, context) => ({
  // counter: observable(counter),
  counter,
  decrement,
  increment,
});

const CounterComponent = ({
  counter,
  decrement,
  increment,
}) => {
  return (
    <div>
      <span>
        Click Count: {counter}
      </span>
      <input type="button" value="Increment" onClick={increment} />
      <input type="button" value="Decrement" onClick={decrement} />
    </div>
  );
};


const Counter = inject(mapStoreToProps)(CounterComponent);
// const Counter = inject(mapStoreToProps)(observer(CounterComponent));

// const store = new Store();

const NewCounter = () => (
  <Provider store={new Store()}>
    <Counter />
  </Provider>
);


const addCounter = ({ counters }) => {
  return { counters: [...counters, <NewCounter key={counters.length} />] };
};


@inject('store')
class App extends Component {
  constructor(props) {
    super(props);

    this.store = props.store;

    // this.addCounter = this._addCounter.bind(this);
    this.onClick = () => this.setState(addCounter);

    this.logState = this._logState.bind(this);
    this.logStore = this._logStore.bind(this);
    this.logPropsStore = this._logPropsStore.bind(this);

    this.state = { counters: [] };
  }



  render() {
    return (
      <div className="react-mobx-training">
        <Counter />
        <Counter />
        <NewCounter />
        <div>
          class App
          <input type="button" value="Add Counter +" className="add" onClick={this.onClick} />
          <div>
            <input type="button" value="this.state" onClick={this.logState} />
            <input type="button" value="this.store" onClick={this.logStore} />
            <input type="button" value="this.props.store" onClick={this.logPropsStore} />
          </div>
        </div>
        {!!this.state.counters.length &&
          this.state.counters
        }
      </div>
    );
  }

  _addCounter() {
    const { counters } = this.state;
    counters.push(<NewCounter />);
    this.setState({ counters });
  }

  _logState() {
    console.log('this.state\n', this.state);
  }

  _logStore() {
    console.log('this.store\n', toJS(this.store));
  }

  _logPropsStore() {
    console.log('this.props.store\n', toJS(this.props.store));
  }
}

export default App;