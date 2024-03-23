import React, { useEffect, useState } from 'react';
import Timer from './Timer';


function Tabs({ data }) {
  const [products, setProducts] = useState([]);
 
  
  useEffect(() => {
    setProducts(prevProducts => {
      const index = prevProducts.findIndex(product => product.title === data.title);
      if (index !== -1) {
        // Replace the existing product with the new one
        prevProducts[index] = {
          ...prevProducts[index],
          timeInterval: prevProducts[index].timeInterval + 0.000001 // Update timeInterval by 1 millisecond
        };
        return [...prevProducts];
      } else {
        // Add the new product to the array
        return [...prevProducts, data];
      }
    });
  }, [data]);


  const displayProducts = products.map((product, index) => (
    product.title && (
      <div className="product-container" key={product.title}>
        
        <div className='title-and-photo'>
          <h3>{product.title}</h3>
          <img src={product.photo} alt="" />
          <p>Desired Price: <strong className='orange-text'>${product.desiredPrice}</strong></p>
          <a href={product.pinned.url}>View product</a>
        </div>
        {product.pinned && (
          <div className='pinned-offer'>
            <h2>Pinned Offer</h2>
            <p>Price: {product.pinned.price}</p>
            <p>Ships from: {product.pinned.ships_from}</p>
            <p>Sold by: {product.pinned.sold_by}</p>
            <p>Delivery Details: {product.pinned.delivery_details}</p>
            <Timer 
              time={product.timeInterval}
            />
          </div>
        )}
        <div className="vertical-line"></div>
        <div className="offers-container">
          <h2>Other Offers</h2>
          <div className='offers'>
            {product.offers && product.offers.map(offer => (
              <div key={offer.url}>
                <p>Price: {offer.price}</p>
                <p>Ships from: {offer.ships_from}</p>
                <p>Sold by: {offer.sold_by}</p>
                <p>Delivery Details: {offer.delivery_details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  ));

  return <main>{displayProducts}</main>;
}

export default Tabs;
