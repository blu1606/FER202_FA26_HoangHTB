function ProductInfo({ product }) {
    return (
        <div>
            {/* <h1>Production Page</h1> */}
            <p>Production name: {product.name}</p>
            <p>Production price: {product.price}</p>
            <p>Production tag: {product.tag}</p>
        </div>
    )
}

export default ProductInfo;