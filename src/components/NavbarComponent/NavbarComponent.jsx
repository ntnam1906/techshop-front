import React from "react";
import '../../public/local/css/home.css'
import { Link } from "react-router-dom";

const NavbarComponent = () => {
    return(
    <nav>
        <div id="menu" class="collapse navbar-collapse">
            <ul>
                <li class="menu-item">
                    <Link class="prd-nav" to="/category/<%= category._id %>">Iphone</Link>
                </li>
                <li class="menu-item">
                    <Link class="prd-nav" to="/category/<%= category._id %>">Samsung</Link>
                </li>
                <li class="menu-item">
                    <Link class="prd-nav" to="/category/<%= category._id %>">Xiaomi</Link>
                </li>
            </ul>
        </div>
    </nav>
)
}

export default NavbarComponent