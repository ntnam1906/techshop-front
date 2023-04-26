import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../public/local/css/cart.css"
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const OrderPage = () => {
	const [data, setData] = useState([])
    const [status, setStatus] = useState()
    const [shouldUpdate, setShouldUpdate] = useState(false);
	const access_token = localStorage.getItem('access_token')

    useEffect(() => {
        axios.get('http://localhost:3000/api/local/order', {
            headers: {
                'token': `Beare ${access_token}`
            }})
        .then(response => {
            setData(response.data)
            setShouldUpdate(false)
        })
        .catch(error => console.log(error))
    }, [shouldUpdate])
    
    function handleCancle(id) {
        axios.post(`http://localhost:3000/api/local/order-delete/${id}`,{
            message: "delete order"
        }, {
            headers: {
                'token': `Beare ${access_token}`
            }})
        .then(response => {
            setShouldUpdate(true);
            setStatus(response.status)
        })
        .catch(error => console.log(error))
    }
    if(status === 201) {
		NotificationManager.success('Hủy đơn hàng thành công');
        setStatus(null);
        setShouldUpdate(true);
        
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
                            <h2>Lịch sử đơn hàng</h2>
                            <div id="my-cart">
                                <div className="row">
                                    <div className="cart-nav-item col-lg-5 col-md-5 col-sm-12">
                                        Đơn hàng
                                    </div>
                                    <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
                                        Tùy chọn
                                    </div>
                                    <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Tổng cộng</div>
                                    <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tình trạng</div>
                                </div>
                                <form>
                                    {data.orders && data.orders.map(order => {
                                        return (
                                            <div className="cart-item row" key={order._id}>
                                                <div className="cart-nav-item col-lg-5 col-md-5 col-sm-12">
                                                    {order.products.map(product => {
                                                        return (<h4 key={product._id}>{product.items.name}, </h4>)
                                                    })}
                                                    
                                                </div>
                                                <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
                                                    {(order.isPaid === false || order.isComfirmed === false) && order.isCancle === false  && <Button id="del-btn" onClick={() => handleCancle(order._id)}>Hủy đơn hàng</Button>}
                                                </div>
                                                <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">{Number.isInteger(order.totalPrice) && order.totalPrice.toLocaleString()}</div>
                                                <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
                                                    {order.isPaid === false && order.isCancle === false && order.isComfirmed === false && <span style={{color: "#ffc107"}}>Chưa thanh toán</span>}
                                                    {order.isCancle === true && <span style={{color: "#dc3545"}}>Đã hủy</span>}
                                                    {order.isPaid === true && order.isCancle === false && order.isComfirmed === true && <span style={{color: "#28a745"}}>Đã xác nhận</span>}
                                                    
                                                    
                                                </div>
                                                
                                            </div>
                                        )
                                    })}


                                </form>
                            </div>
                           
                            
                        </div>

                        <SideBarComponent />
                    </div>
                </div>
            </div>
            
            <FooterComponent />
        </React.Fragment>
    )
}

export default OrderPage