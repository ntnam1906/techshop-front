import React, { useEffect, useState } from "react";
import '../../public/local/css/home.css'
import { Link } from "react-router-dom";
import axios from "axios";

const NavbarComponent = () => {
    const [data, setData] = useState({})
    
    useEffect(() => {
        axios.get('https://techshop-backend-0cyn.onrender.com/api/local')
        .then(response => setData(response.data))
        .catch(error => console.log(error))
    }, [])
    const categories = data.categories
    return(
    <nav>
        <div id="menu" className="collapse navbar-collapse">
            <ul>
                {categories && categories.map(category => {
                    return(
                        <li className="menu-item" key={category._id}>
                            <Link className="prd-nav" to={`/category/${category._id}`}>{category.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    </nav>
)
}

export default NavbarComponent