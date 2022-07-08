import { Fragment,useState } from "react";
import './shipping.css'
import HomeIcon from '@material-ui/icons/Home'
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";
import PinDropIcon from "@material-ui/icons/PinDrop";
import PublicIcon from "@material-ui/icons/Public";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import {saveAddressAction} from '../../store/action/cartAction'
import { toast } from "react-toastify";
const Shipping = ()=>{
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const {shippingAddress} = useSelector((state) => state.cart);
    const [country,setCountry] = useState(shippingAddress.country);
    const [state,setState] = useState(shippingAddress.state);
    const [address,setAddress] = useState(shippingAddress.address);
    const [city,setCity] = useState(shippingAddress.city);
    const [pincode,setPinCode] = useState(shippingAddress.pincode);
    const [phone,setPhone] = useState(shippingAddress.phone);
    const onSubmitHandler = (event) =>{
      event.preventDefault();
      if(phone.length < 10 || phone.length > 10)
      {
        toast.error("Phone number should be 10 digit");
        return;
      }
      toast.success("address set");
      dispatch(saveAddressAction({address,city,phone,state,country,pincode}));
      navigate("/order/confirm");
  }
    return <Fragment>
        <CheckoutSteps activeStep={0} />
        <div className="shipContainer">
            <div className="shipBox">
                <h2>Shipping Details</h2>
                <form onSubmit={onSubmitHandler} className="shipForm">
                    <div>
                        <HomeIcon/>
                        <input value = {address} onChange={(e)=>setAddress(e.target.value)} required type = "text"  placeholder="Address" />
                    </div>
                    <div>
                        <LocationCityIcon/>
                        <input value={city} onChange={(e) => setCity(e.target.value)} type = "text" required  placeholder="City" />
                    </div>
                    <div>
                        <PhoneIcon/>
                        <input value = {phone} onChange={(e) => setPhone(e.target.value)} type = "number" required  placeholder="Phone Number" />
                    </div>
                    <div>
                        <PinDropIcon/>
                        <input value = {pincode} onChange={(e) => setPinCode(e.target.value)} type = "number" required  placeholder="Pin Code" />
                    </div>
                    <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shipBtn"
              
            />
                </form>
            </div>
        </div>
    </Fragment>
}
export default Shipping;