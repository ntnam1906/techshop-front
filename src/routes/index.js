import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AddCategoryPage from "../pages/admin/CategoryAdminPage/AddcategoryAdminPage";
import CategoryAdminPage from "../pages/admin/CategoryAdminPage/CategoryAdminPage";
import EditCategoryPage from "../pages/admin/CategoryAdminPage/EditCategoryAdminPage";
import DashBoardPage from "../pages/admin/DashBoardPage/DashBoardPage";
import LoginAdminPage from "../pages/admin/LoginAdminPage/LoginAdminPage";
import AddProductAdminPage from "../pages/admin/ProductAdminPage/AddProductAdminPage";
import EditProductAdminPage from "../pages/admin/ProductAdminPage/EditProductAdminPage";
import ProductAdminPage from "../pages/admin/ProductAdminPage/ProductAdminPage";
import AddUserPage from "../pages/admin/UserPage/AddUserPage";
import EditUserPage from "../pages/admin/UserPage/EditUserPage";
import UserPage from "../pages/admin/UserPage/UserPage";
import CategoryPage from "../pages/local/CategoryPage/CategoryPage";
import HomePage from "../pages/local/HomePage/HomePage";
import LoginPage from "../pages/local/LoginPage/LoginPage";
import ProductPage from "../pages/local/ProductPage.jsx/ProductPage";
import RegisterPage from "../pages/local/RegisterPage/RegisterPage";
import SearchPage from "../pages/local/SearchPage/SearchPage";


export const routes = [
    {
        path: '/',
        page: HomePage,
    },
    {
        path: '/search?:keyword',
        page: SearchPage,
    },
    {
        path: '/login',
        page: LoginPage,
    },
    {
        path: '/product/:id',
        page: ProductPage,
    },
    {
        path: '/register',
        page: RegisterPage,
    },
    {
        path: '/search',
        page: SearchPage,
    },
    {
        path: '/category/:id',
        page: CategoryPage,
    },
    {
        path: '/category/:id?page=:page',
        page: CategoryPage,
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
        path: '/admin/user/add',
        page: AddUserPage,
    },
    {
        path: '/admin/user/edit/:id',
        page: EditUserPage,
    },
    {
        path: '/admin/category',
        page: CategoryAdminPage,
    },
    {
        path: '/admin/category/add',
        page: AddCategoryPage,
    },
    {
        path: '/admin/category/edit/:id',
        page: EditCategoryPage,
    },
    {
        path: '/admin/product',
        page: ProductAdminPage,
    },
    {
        path: '/admin/product/add',
        page: AddProductAdminPage,
    },
    {
        path: '/admin/product/edit/:id',
        page: EditProductAdminPage,
    },
    {
        path: '*',
        page: NotFoundPage
    },
]