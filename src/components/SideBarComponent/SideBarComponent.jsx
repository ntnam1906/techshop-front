import React from "react";
import '../../public/local/css/home.css'
import banner1 from '../../public/local/images/banner-1.png'
import banner2 from '../../public/local/images/banner-2.png'
import banner3 from '../../public/local/images/banner-3.png'
import banner4 from '../../public/local/images/banner-4.png'
import banner5 from '../../public/local/images/banner-5.png'
import banner6 from '../../public/local/images/banner-6.png'
import { Link } from "react-router-dom";

const SideBarComponent = () => {
    return(
    <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
        <div id="banner">
            <div className="banner-item">
                <Link to="#">
                    <img className="img-fluid" src={banner1} />
                </Link>
            </div>
            <div className="banner-item">
                <Link to="#">
                    <img className="img-fluid" src={banner2} />
                </Link>
            </div>
            <div className="banner-item">
                <Link to="#"
                    ><img className="img-fluid" src={banner3}
                /></Link>
            </div>
            <div className="banner-item">
                <Link to="#"
                    ><img className="img-fluid" src={banner4}
                /></Link>
            </div>
            <div className="banner-item">
                <Link to="#"
                    ><img className="img-fluid" src={banner5}
                /></Link>
            </div>
            <div className="banner-item">
                <Link to="#"
                    ><img className="img-fluid" src={banner6}
                /></Link>
            </div>
        </div>
    </div>

    
)
}

export default SideBarComponent