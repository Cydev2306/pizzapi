import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  fetchListPizzas,
} from '../actions/pizzas';

class App extends Component {
  onClickDiv(e) {
    console.log('Hello World !!');
  }

  componentWillMount() {
    const { listPizzas } = this.props;
    listPizzas();
  }

  formatPrice(price) {
    return price / 100;
  }

  renderPizzaList() {
    const { pizza } = this.props;
    return pizza.result.map(
      (key) => {
        const current = pizza.entities[key];
        return (
          <li key={key}>
            {current.name} - {this.formatPrice(current.price)} €
          </li>
      )
      }
    )
  }

  render() {
    return (
      <div onClick={this.onClickDiv}>
        {this.renderPizzaList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    pizza,
  } = state;

  return {
    pizza: pizza.toJS(),
  };
}

export default connect(mapStateToProps, {
  listPizzas: fetchListPizzas,
})(App);
