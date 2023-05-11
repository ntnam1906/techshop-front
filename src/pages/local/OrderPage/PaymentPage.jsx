import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "../../../public/local/css/cart.css"
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { PayPalButton } from "react-paypal-button-v2";

const PaymentPage = () => {
    const [data, setData] = useState([])
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [total, setTotal] = useState(0)
	const access_token = localStorage.getItem('access_token')
	const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`https://techshop-backend-0cyn.onrender.com/api/local/payment/${id}`, {
            headers: {
                'token': `Beare ${access_token}`
            }})
        .then(response => {
            setData(response.data.order)
            setTotal(response.data.order.totalPrice / 23000)
            setShouldUpdate(false)
        })
        .catch(error => console.log(error))
    }, [shouldUpdate])
    let usd = total.toFixed(2).toString()
    const paymentSuccess = (email) => {
        axios.post(`https://techshop-backend-0cyn.onrender.com/api/local/payment-success/${id}`, {
            emailPayment: email
        },{
            headers: {
                'token': `Beare ${access_token}`
            }})
        .then(response => {
            const notificationId = NotificationManager.success("", "Thanh toán thành công. Vui lòng chờ shop xác nhận đơn hàng",1500);
            setTimeout(() => {
                const notification = NotificationManager.notifications
                if (notification && notification.length > 0) {
                  NotificationManager.remove(notificationId);
                }
            }, 1500);
            setTimeout(() => navigate('/order'), 2000)
        }) 
        .catch()
    }
    return(
        <React.Fragment>
            <NotificationContainer />
            <HeaderComponent />
            <div id="body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <NavbarComponent />
                        </div>
                    </div>
                    <div className="row">
                        <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                            <SliderComponent />
                            <br />
                            <h2>Thanh toán</h2>
                            <div style={{display:'flex'}}>
                            <span style={{color: '#000', fontSize: '24px'}}>Tổng tiền: </span>
                            <span style={{display:'flex', flexDirection: 'column', marginLeft: '15px', paddingBottom: '30px'}}>
                                <span style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>{Number.isInteger(data.totalPrice) && data.totalPrice.toLocaleString()} VND ~ ({Number.isInteger(data.totalPrice) && (data.totalPrice/23000).toLocaleString('en-US', {style: 'currency', currency: 'USD'})})</span>
                                <span style={{color: '#000', fontSize: '11px'}}>(Đã bao gồm VAT nếu có)</span>
                            </span>
                            </div>
                            <PayPalButton
                                amount={usd}
                                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                intent="authorize"
                                onSuccess={(details, data) => {
                                    return paymentSuccess(details.payer.email_address)
                                }}
                            />

                        </div>

                        <SideBarComponent />
                    </div>
                </div>
            </div>
            
            <FooterComponent />
        </React.Fragment>
    )
}

export default PaymentPage