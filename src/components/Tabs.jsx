import React, { useEffect, useState } from 'react';

function Tabs({ data }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(prevProducts => [...prevProducts, data]);
  }, [data]);

  
  console.log(products)
  
  const displayProducts = products.map(product => {
    return(
      <main>
        <h1>{product.title}</h1>
        <img src={product.photo} alt="" />
        
      </main>
    )

  })

  return (
    <main>
      { displayProducts }
    </main>
  );
}

export default Tabs;
