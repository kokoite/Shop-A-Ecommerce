import './confirmOrderCart.css'
const confirmOrderCartItem = ({product})=>{
    return <div className='confirmOrderItem'>
        <div className='confirmProd'>
            <img src={product.image} alt = {product.name} />
            <p>{product.name}</p>
        </div>
        <div className='confirmPrice'>
            <p>{`${product.quantity} * ₹${product.price}`}</p>
        </div>
    </div>
}
export default confirmOrderCartItem;