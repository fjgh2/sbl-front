import {createBrowserRouter} from 'react-router-dom';
import App from "../../App.tsx";
import LoginPage from "../../pages/user/LoginPage.tsx";
import RegisterPage from "../../pages/user/RegisterPage.tsx";
import MainPage from "../../pages/user/MainPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: < App/>,
        children: [
            {path: 'login', element: <LoginPage />},
            {path: 'register', element: <RegisterPage />},
            {path: 'main', element: <MainPage/>},
            // {path: 'checkout', element: <Checkout/>},
            // {
            //     path: 'admin',
            //     element: <AdminLayout />,
            //     children: [
            //         // {path: 'services', element: <AdminServices />},
            //         {path: 'orders', element: <AdminOrders />},
            //         {path: 'statistics', element: <AdminStats />},
            //         {path: 'coupons', element: <AdminCoupons />},
            //     ]
            // },
            // {
            //     path: 'profile',
            //     element: <CustomerLayout />,
            //     children: [
            //         {path: '', element: <CustomerProfile />},
            //         {path: 'orders', element: <CustomerOrders />},
            //     ]
            // },
            {path: '', element: <MainPage />},
        ],
    }
]);