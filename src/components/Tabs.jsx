import React, { useEffect, useState } from 'react';

function Tabs({ data }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(prevProducts => [...prevProducts, data]);
  }, [data]);

  const displayProducts = products.map(product => (
    <div key={product.title}>
      <h1>{product.title}</h1>
      <img src={product.photo} alt="" />
      {product.pinned && (
        <div>
          <h2>Pinned Offer:</h2>
          <p>Price: {product.pinned.price}</p>
          <p>Ships from: {product.pinned.ships_from}</p>
          <p>Sold by: {product.pinned.sold_by}</p>
          <p>Delivery Details: {product.pinned.delivery_details}</p>
          <a href={product.pinned.url}>View offer</a>
        </div>
      )}

      {product.offers && <h2>Other Offers:</h2>}
      {product.offers && product.offers.map(offer => (
        <div key={offer.url}>
          <p>Price: {offer.price}</p>
          <p>Ships from: {offer.ships_from}</p>
          <p>Sold by: {offer.sold_by}</p>
          <p>Delivery Details: {offer.delivery_details}</p>
          <a href={offer.url}>View offer</a>
        </div>
      ))}
    </div>
  ));

  return <main>{displayProducts}</main>;
}

export default Tabs;
