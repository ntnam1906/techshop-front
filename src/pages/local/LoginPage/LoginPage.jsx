import React from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";

const LoginPage = () => {
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
                            <br />
                            <h2>ĐĂNG NHẬP</h2>
							<form role="form" method="post">
								<fieldset>
									<div class="form-group">
										<input
											class="form-control"
											placeholder="E-mail"
											name="mail"
											type="email"
											autofocus
										/>
									</div>
									<div class="form-group">
										<input
											class="form-control"
											placeholder="Mật khẩu"
											name="pass"
											type="password"
											value=""
										/>
									</div>
									<div class="checkbox">
										<label>
											<input
												name="remember"
												type="checkbox"
												value="Remember Me"
											/> Nhớ tài khoản
										</label>
									</div>
									<button type="submit" class="btn btn-primary">
										Đăng nhập
									</button>
								</fieldset>
								<br />
								<p>
									<span>Nếu chưa có tài khoản vui lòng </span>
									<a href="/register"> đăng ký</a> tại đây
								</p>
							</form>
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

export default LoginPage