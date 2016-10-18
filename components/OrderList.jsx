import React, { PropTypes } from 'react';

const renderList = (orders) =>
  orders.result.map((key) => {
    const current = orders.entities[key];
    return (
      <li key={key}>
        status: {current.status}, createdAt: {current.createdAt}
      </li>
    );
  })

const OrderList = ({orders}) => {
  if (orders.result.length) {
    return (
      <ul>
        {renderList(orders)}
      </ul>
    );
  }
  return (<h1>Aucune commande.</h1>);
}

export default OrderList;
