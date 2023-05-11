import React, { useEffect, useState } from "react";
import '../../../public/local/css/home.css'
import '../../../public/admin/css/bootstrap.css'
import './productpage.css'
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ProductPage = () => {
	const [data, setData] = useState([])
	const [comments, setComments] = useState([])
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const { id } = useParams()
	const navigate = useNavigate()
	const location = useLocation()
	const access_token = localStorage.getItem('access_token')

	const [formData, setFormData] = useState({
        comm_details: "",
	})

	useEffect(() => {

		const fetchData = async () => {
			try {
			  const { data } = await axios.get(`https://localhost:3000/api/local/product/${id}`);
			  setData(data);
			  setShouldUpdate(false)
			} catch (error) {
			  console.log(error);
			}
		  };
		
		  fetchData();
	}, [id])

	useEffect(() => {

		const fetchData = async () => {
			try {
			  const { data } = await axios.get(`https://localhost:3000/api/local/get-comment/${id}`);
			  setComments(data.comments);
			} catch (error) {
			  console.log(error);
			}
		  };
		
		  fetchData();
	}, [shouldUpdate])
	const product = data.product
	const handleAddOrder = () => {
		if(access_token) {
			if(product.is_stock === false) {
				const notificationId = NotificationManager.error("", "Sản phẩm tạm thời đang hết hàng. Vui lòng quay lại sau",1000);
				setTimeout(() => {
					const notification = NotificationManager.notifications
					if (notification && notification.length > 0) {
					NotificationManager.remove(notificationId);
					}
				}, 1000);
			}
			else {
				const notificationId = NotificationManager.success("", "Sản phẩm đã được thêm vào giỏ hàng",1500);
				setTimeout(() => {
					const notification = NotificationManager.notifications
					if (notification && notification.length > 0) {
					NotificationManager.remove(notificationId);
					}
				}, 1500);
				axios.post(`http://localhost:3000/api/local/product/add-cart/${id}`, {message: "Add"}, {
					headers: {
						'token': `Beare ${access_token}`
					}
				})
				.then(response => console.log(response))
				.catch(error => console.log(error))
			}
		}
		else {
			navigate('/login', {state: location?.pathname})
		}
	}
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
	const handleComment = function(event) {
		event.preventDefault()
		
		axios.post(`http://localhost:3000/api/local/comment-product/${id}`, formData, {
			headers: {
				'token': `Beare ${access_token}`
			}})
			.then((res) => {
			// handle response
				const notificationId = NotificationManager.success("", "Bình luận sản phẩm thành công",1500);
				setTimeout(() => {
					const notification = NotificationManager.notifications
					if (notification && notification.length > 0) {
					NotificationManager.remove(notificationId);
					}
				}, 1500);
				setShouldUpdate(true)
				formData.comm_details = ""
			})
			.catch(error => {
				if(error.response.status === 401) {
					const notificationId = NotificationManager.error("", "Bạn phải đăng nhập để tiếp tục",1500);
					setTimeout(() => {
						const notification = NotificationManager.notifications
						if (notification && notification.length > 0) {
						NotificationManager.remove(notificationId);
						}
					}, 1500);
					setTimeout(() => navigate('/login'), 2000)
				}
			})
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

                            <div id="product">
							<div id="product-head" className="row">
								<div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
								{product && <img src={`data:${product.thumbnail.contentType};base64,${Buffer.from(product.thumbnail.data).toString('base64')}`} alt={product.name} id="img-product"/>}
								</div>
								<div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
									<h1>{product && product.name}</h1>
									<ul>
										<li><span>Bảo hành:</span> {product && product.warranty}</li>
										<li><span>Đi kèm:</span> {product && product.accessories}</li>
										<li><span>Tình trạng:</span> {product && product.status}</li>
										<li><span>Khuyến Mại:</span> {product && product.promotion}</li>
										<li><hr/></li>
										<li id="price">Giá Bán (chưa bao gồm VAT)</li>
										<li id="price-number">{product && product.price.toLocaleString()}đ</li>
										<li id="status-true">{product && product.is_stock === true ? 'Còn hàng' : 'Hết Hàng' }</li>
									</ul>
									<div className="btn-contain">
										<div id="add-cart">
											<button className="custom-btn btn-7" onClick={handleAddOrder}>Mua ngay</button>
										</div>
										{/* <div id="ibx">
											<Button to="" id="ibx-now">Chat để nhận tư vấn</Button>
										</div> */}
									</div>
										
								</div>
							</div>
							<div id="product-body" className="row">
								<div className="col-lg-12 col-md-12 col-sm-12">
									<h3>Đánh giá về sản phẩm</h3>
									<p>
										Màn hình OLED có hỗ trợ HDR là một sự nâng cấp mới của Apple
										thay vì màn hình LCD với IPS được tìm thấy trên iPhone 8 và
										iPhone 8 Plus đem đến tỉ lệ tương phản cao hơn đáng kể là
										1.000.000: 1, so với 1.300: 1 ( iPhone 8 Plus ) và 1.400: 1
										( iPhone 8 ).
									</p>
									<p>
										Màn hình OLED mà Apple đang gọi màn hình Super Retina HD có
										thể hiển thị tông màu đen sâu hơn. Điều này được thực hiện
										bằng cách tắt các điểm ảnh được hiển thị màu đen còn màn
										hình LCD thông thường, những điểm ảnh đó được giữ lại. Không
										những thế, màn hình OLED có thể tiết kiệm pin đáng kể.
									</p>
									<p>
										Cả ba mẫu iPhone mới đều có camera sau 12MP và 7MP cho
										camera trước, nhưng chỉ iPhone X và iPhone 8 Plus có thêm
										một cảm biến cho camera sau. Camera kép trên máy như thường
										lệ: một góc rộng và một tele. Vậy Apple đã tích hợp những gì
										vào camera của iPhone X?
									</p>
									<p>
										Chống rung quang học (OIS) là một trong những tính năng được
										nhiều hãng điện thoại trên thế giới áp dụng. Đối với iPhone
										X, hãng tích hợp chống rung này cho cả hai camera, không như
										IPhone 8 Plus chỉ có OIS trên camera góc rộng nên camera
										tele vẫn rung và chất lượng bức hình không đảm bảo.
									</p>
									<p>
										Thứ hai, ống kính tele của iPhone 8 Plus có khẩu độ f / 2.8,
										trong khi iPhone X có ống kính tele f / 2.2, tạo ra một
										đường cong nhẹ và có thể chụp thiếu sáng tốt hơn với ống
										kính tele trên iPhone X.
									</p>
									<p>
										Portrait Mode là tính năng chụp ảnh xóa phông trước đây chỉ
										có với camera sau của iPhone 7 Plus, hiện được tích hợp trên
										cả iPhone 8 Plus và iPhone X. Tuy nhiên, nhờ sức mạnh của
										cảm biến trên mặt trước của iPhone X, Camera TrueDepth cũng
										có thể chụp với Potrait mode.
									</p>
								</div>
							</div>

							<div id="comment" className="row">
								<div className="col-lg-12 col-md-12 col-sm-12">
									<h3>Bình luận sản phẩm</h3>
									<form method="post" onSubmit={handleComment}>
										<div className="form-group">
											<label>Nội dung:</label>
											<textarea
												name="comm_details"
												required
												rows="8"
												className="form-control"
												onChange={handleChange}
												value={formData.comm_details}
											></textarea>
										</div>
										<button type="submit" name="sbm" className="custom-btn btn-7">
											Gửi
										</button>
									</form>
								</div>
							</div>


							<div id="comments-list" className="row" style={{marginTop: "10px"}}>
									{comments && comments.map(comment => {
										return (
										<div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: '10px', backgroundColor: "#ccc", borderRadius: '10px', paddingLeft: '-20px'}}>

											<div className="comment-item" key={comment._ic}>
												<ul>
													<li style={{listStyleType: "none"}}><b>{comment.user_id.full_name}</b></li>
													<li style={{listStyleType: "none"}}>
														<p>{comment.body}</p>
													</li>
												</ul>
											</div>
										</div>
										)
									})}
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

export default ProductPage