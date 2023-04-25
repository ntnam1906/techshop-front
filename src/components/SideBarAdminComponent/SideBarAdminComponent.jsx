import React from "react";
import '../../public/admin/css/bootstrap.css'
import '../../public/admin/css/styles.css'
import './sidebar.css'
import {Link} from 'react-router-dom'
import {BsBadgeAdFill, BsFillBrightnessAltHighFill, BsFillPersonLinesFill, BsChatLeftText, BsBagDash, BsDatabase, BsNut, BsBagHeartFill} from 'react-icons/bs'
const SideBarAdminComponent = () => {
    return(
    <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
        <form role="search">
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
            </div>
        </form>
        <ul className="nav nav1 menu">
            <li><Link to="/admin/dashboard"><BsFillBrightnessAltHighFill /> Dashboard</Link></li>
            <li><Link to="/admin/user"><BsFillPersonLinesFill /> Quản lý thành viên</Link></li>
            <li><Link to="/admin/category"><BsDatabase /> Quản lý danh mục</Link></li>
            <li><Link to="/admin/product"><BsBagDash /> Quản lý sản phẩm</Link></li>
            <li><Link to="/admin/order"><BsBagHeartFill /> Quản lý đơn hàng</Link></li>
            <li><Link to="#"><BsChatLeftText /> Quản lý bình luận</Link></li>
            <li><Link to="#"><BsBadgeAdFill /> Quản lý quảng cáo</Link></li>
            <li><Link to="#"><BsNut /> Cấu hình</Link></li>
        </ul>
    </div>

)
}

export default React.memo(SideBarAdminComponent)