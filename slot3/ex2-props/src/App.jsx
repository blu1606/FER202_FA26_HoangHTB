import { useState } from 'react'
import './App.css'
import ProductInfo from './ProductInfo'

function App() {
  const product1 = {
    name: "product1",
    price: 1000,
    tag: "test",
    avatar: "/image/pizza-1.jpg"
  }

  const product2 = {
    name: "product2",
    price: 1001,
    tag: "test2",
    avatar: "/image/pizza-2.jpg"
  }
  return (
    <>
      <h1>Production Page</h1>
      <ProductInfo product={product1} />
      <hr />
      <ProductInfo product={product2} />
    </>
  )
}

export default App
