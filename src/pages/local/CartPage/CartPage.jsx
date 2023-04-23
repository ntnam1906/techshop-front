import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../public/local/css/cart.css"


const CartPage = () => {
	const [data, setData] = useState()

    useEffect(() => {
        axios.get('http://localhost:3000/api/local/cart')
        .then(response => setData(response.data))
        .catch(error => console.log(error))
    }, [])
    const dataCart = data.dataCart
    const totalMoney = data.totalMoney
    return(
        <React.Fragment>
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
                                <div class="row">
                                    <div class="cart-nav-item col-lg-7 col-md-7 col-sm-12">
                                        Thông tin sản phẩm
                                    </div>
                                    <div class="cart-nav-item col-lg-2 col-md-2 col-sm-12">
                                        Tùy chọn
                                    </div>
                                    <div class="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
                                </div>
                                <form method="post" action="/cart-reload">
                                    {dataCart && dataCart.map(cart => {
                                        return (
                                            <div class="cart-item row">
                                                <div class="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                                    <img
                                                        src="/static/local/images/<%= cart.items.thumbnail %>"
                                                    />
                                                    <h4>{cart.items.name}</h4>
                                                </div>

                                                <div class="cart-quantity col-lg-2 col-md-2 col-sm-12">
                                                    <input
                                                        type="number"
                                                        id="quantity"
                                                        class="form-control form-blue quantity"
                                                        value="1"
                                                        min="1"
                                                    />
                                                </div>
                                                <div class="cart-price col-lg-3 col-md-3 col-sm-12">
                                                    <b>{cart.items.price} đ</b>
                                                    <a href="/cart-delete">Xóa</a>
                                                </div>
                                            </div>
                                        )
                                    })}


                                    
                                    <div class="row">
                                        <div class="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                            <button
                                                id="update-cart"
                                                class="btn btn-success"
                                                type="submit"
                                                name="sbm"
                                            >
                                                Cập nhật giỏ hàng
                                            </button>
                                        </div>
                                        <div class="cart-total col-lg-2 col-md-2 col-sm-12">
                                            <b>Tổng cộng:</b>
                                        </div>
                                        <div class="cart-price col-lg-3 col-md-3 col-sm-12">
                                            <b>{totalMoney} đ</b>
                                        </div>
                                    </div>
                                </form>
                            </div>
                           
                            <div id="customer">
                                <form method="post">
                                    <div class="row">
                                        <div id="customer-name" class="col-lg-4 col-md-4 col-sm-12">
                                            <input
                                                placeholder="Họ và tên (bắt buộc)"
                                                type="text"
                                                name="name"
                                                class="form-control"
                                                required
                                            />
                                        </div>
                                        <div id="customer-phone" class="col-lg-4 col-md-4 col-sm-12">
                                            <input
                                                placeholder="Số điện thoại (bắt buộc)"
                                                type="text"
                                                name="phone"
                                                class="form-control"
                                                required
                                            />
                                        </div>
                                        <div id="customer-mail" class="col-lg-4 col-md-4 col-sm-12">
                                            <input
                                                placeholder="Email (bắt buộc)"
                                                type="text"
                                                name="mail"
                                                class="form-control"
                                                required
                                            />
                                        </div>
                                        <div id="customer-add" class="col-lg-12 col-md-12 col-sm-12">
                                            <input
                                                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                                                type="text"
                                                name="add"
                                                class="form-control"
                                                required
                                            />
                                        </div>
                                    </div>
                                </form>
                                <div class="row">
                                    <div class="by-now col-lg-6 col-md-6 col-sm-12">
                                        <a href="/cart-payment">
                                            <b>Mua ngay</b>
                                            <span>Giao hàng tận nơi siêu tốc</span>
                                        </a>
                                    </div>
                                    <div class="by-now col-lg-6 col-md-6 col-sm-12">
                                        <a href="#">
                                            <b>Trả góp Online</b>
                                            <span>Vui lòng call 081 5656 456</span>
                                        </a>
                                    </div>
                                </div>
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