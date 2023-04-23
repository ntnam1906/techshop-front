import React from "react";
import '../../public/local/css/home.css'
import logo from '../../public/local/images/Logo_UET.svg.png'
const FooterComponent = () => {
    return(
    <React.Fragment>
    <div id="footer-top">
        <div className="container">
            <div className="row">
                <div id="logo-2" className="col-lg-3 col-md-6 col-sm-12">
                    <h2>
                        <img id="logo-footer" src={logo} />
                    </h2>
                    <p>
                        Trường Đại học Công nghệ (tiếng Anh: VNU Hanoi-University of Engineering and Technology;
                        viết tắt là: VNU Hanoi-UET) là một trường đại học thành viên của Đại học Quốc gia Hà Nội,
                        được thành lập vào năm 2004[3], địa chỉ tại 144 Xuân Thủy, quận Cầu Giấy, Hà Nội, 
                        trong khuôn viên Đại học Quốc gia Hà Nội khu vực Cầu Giấy cùng với các trường thành viên như
                        Trường Đại học Ngoại ngữ, Trường Đại học Kinh tế, Trường Đại học Y Dược, Khoa Luật,...
                    </p>
                </div>
                <div id="address" className="col-lg-3 col-md-6 col-sm-12">
                    <h3>Địa chỉ</h3>
                    <p>144 Xuân Thủy - Cầu Giấy - Hà Nội</p>
                    <p>Giảng đường 3 - Tôn Thất Thuyết - Hà Nội</p>
                </div>
                <div id="service" className="col-lg-3 col-md-6 col-sm-12">
                    <h3>Dịch vụ</h3>
                    <p>Bảo hành rơi vỡ, ngấm nước Care Diamond</p>
                    <p>Bảo hành Care X60 rơi vỡ ngấm nước vẫn Đổi mới</p>
                </div>
                <div id="hotline" className="col-lg-3 col-md-6 col-sm-12">
                    <h3>Hotline</h3>
                    <p>Phone Sale: 081 5656 456</p>
                    <p>Email: 19020379@vnu.edu.vn</p>
                </div>
            </div>
        </div>
    </div>

    <div id="footer-bottom">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <p>
                        2023 © UET . All rights reserved. Developed by Nhom 9 CNPM.
                    </p>
                </div>
            </div>
        </div>
    </div>

    </React.Fragment>

)
}

export default FooterComponent