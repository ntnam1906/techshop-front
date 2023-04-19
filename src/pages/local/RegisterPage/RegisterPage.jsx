import React from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";

const RegisterPage = () => {
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
                            <h2>ĐĂNG KÝ</h2>
                            <div class="panel-body">
                                <form role="form" method="post">
                                    <fieldset>
                                        <div class="form-group">
                                            <label>Họ & Tên</label>
                                            <input
                                                name="full_name"
                                                class="form-control"
                                                placeholder="VD: Nguyen Van A"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input
                                                name="email"
                                                type="text"
                                                class="form-control"
                                                placeholder="VD: exemple@gmail.com"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label>Mật khẩu</label>
                                            <input name="pass" type="password" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label>Nhập lại mật khẩu</label>
                                            <input
                                                name="re_pass"
                                                type="password"
                                                class="form-control"
                                            />
                                        </div>
                                        <button type="submit" class="btn btn-primary">Đăng ký</button>
                                    </fieldset>
                                </form>
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

export default RegisterPage