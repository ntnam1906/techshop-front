import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../../public/local/css/cart.css"
import { Buffer } from "buffer";
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const CartPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
		phone: "",
		email: "",
        address: ""
	})
	const [data, setData] = useState([])
	const [status, setStatus] = useState()
    const [shouldUpdate, setShouldUpdate] = useState(false);
	const access_token = localStorage.getItem('access_token')
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    useEffect(() => {
        const fetchData = async () => {
			try {
			  const { data } = await axios.get('http://localhost:3000/api/local/cart', {
                headers: {
                    'token': `Beare ${access_token}`
                }});
			  setData(data);
              setShouldUpdate(false)
			} catch (error) {
			  console.log(error);
			}
		  };
		
		  fetchData();
	}, [shouldUpdate])
    
    const dataCart = data.dataCart
    
    const totalMoney = data.totalMoney
    function handleDelete(id) {
        axios.post(`http://localhost:3000/api/local/cart-delete/${id}`,{
            message: "delete"
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
    const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
      function handleSubmit(event) {
		event.preventDefault()
		if (formData.fullName && formData.phone && formData.email && formData.address) {
            if (!validateEmail(formData.email)) {
                NotificationManager.error('Email không đúng định dạng. Vui lòng nhập lại');
                return;
              }
			axios.post('http://localhost:3000/api/local/cart-payment', formData, {
                headers: {
                    'token': `Beare ${access_token}`
                }}).then((res) => {
			  // handle response
              setStatus(res.status)
			})
			.catch((error) => {
				console.log(error)
			})
		  } else {
			console.log("Please enter a username and pass");
		  } 
		
	}
    if(status === 200) {
		NotificationManager.success('Xóa sản phẩm thành công');
        setStatus(null);
        setShouldUpdate(true);
	}
    if(status === 201) {
		NotificationManager.success('Mua thành công. Vui lòng thanh toán');
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
                                <div id="my-cart">
                                <div className="row">
                                    <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
                                        Thông tin sản phẩm
                                    </div>
                                    <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
                                        Tùy chọn
                                    </div>
                                    <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
                                </div>
                                <form method="post" action="/cart-reload">
                                    {dataCart && dataCart.map(cart => {
                                        return (
                                            <div className="cart-item row" key={cart._id}>
                                                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                                    {cart && <img src={`data:${cart.items.thumbnail.contentType};base64,${Buffer.from(cart.items.thumbnail.data)}`} alt={cart.items.name}/>}
                                                    <h4>{cart.items.name}</h4>
                                                </div>

                                                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                                                    <Button id="del-btn" onClick={() => handleDelete(cart._id)}>Xóa</Button>

                                                </div>
                                                <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                                                    <b>{Number.isInteger(cart.items.price) && cart.items.price.toLocaleString()} đ</b>
                                                </div>
                                            </div>
                                        )
                                    })}


                                    
                                    <div className="row">
                                        
                                        <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                                            <b>Tổng cộng:</b>
                                        </div>
                                        <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                                            <b>{Number.isInteger(totalMoney) && totalMoney.toLocaleString()} đ</b>
                                        </div>
                                    </div>
                                </form>
                            </div>
                           
                            <div id="customer">
                                <form role="form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                                            <input
                                                placeholder="Họ và tên (bắt buộc)"
                                                type="text"
                                                name="fullName"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.fullName}
                                                required
                                            />
                                        </div>
                                        <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                                            <input
                                                placeholder="Số điện thoại (bắt buộc)"
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.phone}
                                                required
                                            />
                                        </div>
                                        <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                                            <input
                                                placeholder="Email (bắt buộc)"
                                                type="text"
                                                name="email"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.email}
                                                required
                                            />
                                        </div>
                                        <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                                            <input
                                                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                                                type="text"
                                                name="address"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.address}
                                                required
                                            />
                                        </div>
                                        <button className="custom-btn btn-7" type="submit"><span>Mua ngay</span></button>
                                    </div>
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

export default CartPage