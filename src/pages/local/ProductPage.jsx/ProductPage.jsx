import React from "react";
import '../../../public/local/css/home.css'
import '../../../public/admin/css/bootstrap.css'
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import { Link } from "react-router-dom";

const ProductPage = () => {
    return(
    <html>
        <body>
            <HeaderComponent />

            <div id="body">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <NavbarComponent />
                        </div>
                    </div>
                    <div class="row">
                        <div id="main" class="col-lg-8 col-md-12 col-sm-12">
                            <SliderComponent />

                            <div id="product">
							<div id="product-head" class="row">
								<div id="product-img" class="col-lg-6 col-md-6 col-sm-12">
									<img src="" />
								</div>
								<div id="product-details" class="col-lg-6 col-md-6 col-sm-12">
									<h1>Iphone Xs Max</h1>
									<ul>
										<li><span>Bảo hành:</span>3 tháng</li>
										<li><span>Đi kèm:</span> Sạc</li>
										<li><span>Tình trạng:</span> Mới 100%</li>
										<li><span>Khuyến Mại:</span> 100%</li>
										<li id="price">Giá Bán (chưa bao gồm VAT)</li>
										<li id="price-number">1000đ</li>
										<li id="status-true">Còn hàng</li>
									</ul>
									<div class="btn-contain">
										<div id="add-cart">
											<Link to="/product/add-cart/<%= product._id %>">Mua ngay</Link>
										</div>
										<div id="ibx">
											<Link to="/inbox>">Chat để nhận tư vấn</Link>
										</div>
									</div>
								</div>
							</div>
							<div id="product-body" class="row">
								<div class="col-lg-12 col-md-12 col-sm-12">
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

							<div id="comment" class="row">
								<div class="col-lg-12 col-md-12 col-sm-12">
									<h3>Bình luận sản phẩm</h3>
									<form method="post">
										<div class="form-group">
											<label>Nội dung:</label>
											<textarea
												name="comm_details"
												required
												rows="8"
												class="form-control"
											></textarea>
										</div>
										<button type="submit" name="sbm" class="btn btn-primary">
											Gửi
										</button>
									</form>
								</div>
							</div>


							{/* <div id="comments-list" class="row">
								<div class="col-lg-12 col-md-12 col-sm-12">
									<div class="comment-item">
										<ul>
											<li><b><%= comment.user_id.full_name%></b></li>
											<li><%= comment.createdAt%></li>
											<li>
												<p><%= comment.body %></p>
											</li>
										</ul>
									</div>
									<%}%>
								</div>
							</div> */}
						</div>
					</div>

                        <SideBarComponent />
                    </div>
                </div>
            </div>
            
            <FooterComponent />
        </body>
    </html>
    )
}

export default ProductPage