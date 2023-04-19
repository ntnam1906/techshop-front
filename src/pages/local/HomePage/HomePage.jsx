import React from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import DefaultComponent from "../../../components/DefaultComponent/DefaultComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import { Link } from "react-router-dom";

const HomePage = () => {
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

                            <div class="products">
                                <h3>Sản phẩm nổi bật</h3>
                                <div class="product-list card-deck">
                                    <div class="product-item card text-center">
                                        <Link to="/product/<%= feature.id%>"
                                            ><img src="/static/local/images/<%= feature.thumbnail%>"
                                        /></Link>
                                        <h4>
                                            {/* <Link to="/product/<%= feature.id%>"> <%= feature.name%> </Link> */}
                                        </h4>
                                        {/* <p>Giá Bán: <span><%= feature.price%></span></p> */}
                                    </div>
                                </div>
                            </div>

                            <div class="products">
                                <h3>Sản phẩm mới</h3>
                                <div class="product-list card-deck">
                                    <div class="product-item card text-center">
                                        <Link to="/product/<%=newPrd.id%>"
                                            ><img src="/static/local/images/<%= newPrd.thumbnail%>"
                                        /></Link>
                                        <h4>
                                            {/* <Link to="/product/<%=newPrd.id%>"><%= newPrd.name%></Link> */}
                                        </h4>
                                        {/* <p>Giá Bán: <span><%= newPrd.price%></span></p> */}
                                    </div>
                                </div>
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

export default HomePage