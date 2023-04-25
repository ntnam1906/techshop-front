import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import { Link } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
const HomePage = () => {
    const [data, setData] = useState({})
    
    useEffect(() =>{
        axios.get('http://localhost:3000/api/local')
        .then (response => {
            setData(response.data)
        })
        .catch (error => {
            console.log(error)
        })
    }, [])
    const featuredPrds = data.featuredPrds
    const statusPrds = data.statusPrds
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

                            <div className="products">
                                <h3>Sản phẩm nổi bật</h3>
                                <div className="product-list card-deck">
                                    {featuredPrds && featuredPrds.map(feature =>{
                                        return (
                                            <div className="product-item card text-center" key={feature._id}>
                                                <Link to= {`/product/${feature._id}`} className="button four">
                                                    <img src={`data:${feature.thumbnail.contentType};base64,${Buffer.from(feature.thumbnail.data).toString('base64')}`} alt={feature.name}/>
                                                </Link>
                                                <h4>
                                                    <Link to={`/product/${feature._id}`} id="no-deco"> {feature.name} </Link>
                                                </h4>
                                                <p>Giá Bán: <span>{feature.price.toLocaleString()}đ</span></p>
                                            </div>
                                        )
                                    })}


                                    
                                    
                                </div>
                            </div>

                            <div className="products">
                                <h3>Sản phẩm mới</h3>
                                <div className="product-list card-deck">
                                    {statusPrds && statusPrds.map(prod => {
                                        return (
                                            <div className="product-item card text-center" key={prod._id}>
                                                <Link to= {`/product/${prod._id}`} className="button four">
                                                    <img src={`data:${prod.thumbnail.contentType};base64,${Buffer.from(prod.thumbnail.data).toString('base64')}`} alt={prod.name}/>
                                                </Link>
                                                <h4>
                                                    <Link to={`/product/${prod._id}`} id="no-deco"> {prod.name} </Link>
                                                </h4>
                                                <p>Giá Bán: <span>{prod.price.toLocaleString()}đ</span></p>
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

export default HomePage