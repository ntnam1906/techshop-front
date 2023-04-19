import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import CategoryAdminPage from "../pages/admin/CategoryAdminPage/CategoryAdminPage";
import DashBoardPage from "../pages/admin/DashBoardPage/DashBoardPage";
import LoginAdminPage from "../pages/admin/LoginAdminPage/LoginAdminPage";
import ProductAdminPage from "../pages/admin/ProductAdminPage/ProductAdminPage";
import UserPage from "../pages/admin/UserPage/UserPage";
import HomePage from "../pages/local/HomePage/HomePage";
import LoginPage from "../pages/local/LoginPage/LoginPage";
import ProductPage from "../pages/local/ProductPage.jsx/ProductPage";
import RegisterPage from "../pages/local/RegisterPage/RegisterPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
    },
    {
        path: '/login',
        page: LoginPage,
    },
    {
        path: '/product',
        page: ProductPage,
    },
    {
        path: '/register',
        page: RegisterPage,
    },
    {
        path: '/admin/login',
        page: LoginAdminPage,
    },
    {
        path: '/admin/dashboard',
        page: DashBoardPage,
    },
    {
        path: '/admin/user',
        page: UserPage,
    },
    {
        path: '/admin/category',
        page: CategoryAdminPage,
    },
    {
        path: '/admin/product',
        page: ProductAdminPage,
    },
    {
        path: '*',
        page: NotFoundPage
    },
]