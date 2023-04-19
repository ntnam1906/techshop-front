import React from "react";
import '../../../public/admin/css/bootstrap.css'
import '../../../public/admin/css/styles.css'
import '../../../public/admin/css/datepicker3.css'
import '../../../public/admin/css/bootstrap-table.css'
const LoginAdminPage = () => {
    return(
        <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">Tech Shop - Administrator</div>
                    <div className="panel-body">
                        <form role="form" method="post">
                            <fieldset>
                                <div className="form-group">
                                    <input className="form-control" placeholder="E-mail" name="mail" type="email" autofocus />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Mật khẩu" name="pass" type="password" value="" />
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="Remember Me" /> Nhớ tài khoản
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary">Đăng nhập</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
	    </div>
)
}

export default LoginAdminPage