import React from 'react'
import playStore from '../../images/playstore.png'
import appStore from '../../images/Appstore.png'
import  './footer.css'
const Footer = ()=>{
    return (
        <footer id = "footer">
            <div className='leftFooter'>
                <h4>Download our App</h4>
                <p>Download app for Android and Ios phone</p>
                <img src = {appStore} alt='AppStore'/>
                <img src = {playStore} alt='PlayStore'/>
            </div>
            <div className='midFooter'>
                <h1>Ecommerce</h1>
                <p>Quality over Quantity</p>
                <p>Copyrights 2022 &copy; YouWon'tGetIt</p>
            </div>
            <div className='rightFooter'>
                <h4>Follow us</h4>
                <a href = "http://instagram.com/pranjalagarwal880">Instagram</a>
            </div>
        </footer>
    )
}
export default Footer;