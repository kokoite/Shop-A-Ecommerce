import React from 'react'
import ReactStars from 'react-rating-stars-component';
import profile from '../../images/Profile.png'
const Reviewcard = ({review}) => {
    const {name,rating,comment} = review;
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size: (window.innerWidth < 800) ? 19: 25,
        value:rating,
        isHalf:true,
    };
    return (
        <div className = "reviewcard">
            <img  src = {profile} alt="profile" />
            <p>{name}</p>
            <ReactStars {...options} />
            <span>{comment}</span>

        </div>
    )
}

export default Reviewcard
