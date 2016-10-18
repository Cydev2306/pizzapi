import React, { PropTypes } from 'react';

const formatPrice = (price) => {
  return price / 100;
}


const renderPizzas = (pizza, order) => {
  return pizza.result.map(
    (key) => {
      const current = pizza.entities[key];
      return (
        <li key={key}>
          {current.name} - {formatPrice(current.price)} €
          <button onClick={() => order(key)}>Commander la pizza</button>
        </li>
    )
    }
  )
}

const PizzaList = ({pizza, order}) => {
  if (pizza.result.length) {
    return (
      <ul>
        {renderPizzas(pizza, order)}
      </ul>
    )
  }
  return (<h1>No datas!</h1>);
}

export default PizzaList;
