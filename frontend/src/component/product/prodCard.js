import React from 'react';
import {Link} from 'react-router-dom'
import { Rating } from "@material-ui/lab";
import  './prodCard.css'

const Product = ({product}) => {
    const options = {
        edit:false,
        color:'rgba(20,20,20,0.1)',
        size:20,
        activeColor:'tomato',
        value:product.rating || 0,
        isHalf:true,
    }
    const url = "https://i.ibb.co/DRST11n/1.webp"; 
    let image = product.images;
    return (
      <Link className='productCard' to = {`/product/${product._id}`}>
          <img src={image[0].url || url} alt={product.name}/>
          <p>{product.name}</p>
          <div>
          <Rating
                
                value={product.rating}
                size="medium"
                name='rating'
                defaultValue={product.rating}
                readOnly = {true}
              />
              <span>{`${product.numOfReviews}`} review</span>
          </div>
          <span>₹{product.price}</span>
      </Link>
  )
};
export default Product;