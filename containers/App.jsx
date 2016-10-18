import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PizzaList from '../components/PizzaList.jsx';
import OrderList from '../components/OrderList.jsx';

import {
  fetchListPizzas,
  orderPizza,
  fetchOrderList,
  fetchSingleOrder,
} from '../actions/pizzas';

class App extends Component {
  componentWillMount() {
    const { listPizzas, listOrders } = this.props;
    listPizzas();
    listOrders();
  }

  render() {
    const { pizza, order, orderSelectedPizza} = this.props;
    return (
      <div>
        <PizzaList pizza={pizza} order={orderSelectedPizza} />
        <OrderList orders={order} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    pizza,
    order,
  } = state;

  return {
    pizza: pizza.toJS(),
    order: order.toJS(),
  };
}

export default connect(mapStateToProps, {
  listPizzas: fetchListPizzas,
  getOrder: fetchSingleOrder,
  listOrders: fetchOrderList,
  orderSelectedPizza: orderPizza,
})(App);
