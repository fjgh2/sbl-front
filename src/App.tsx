import CssBaseline from '@mui/material/CssBaseline';
import Layout from './layout/Layout.tsx';
import Header from './layout/Header.tsx';
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme.ts"
import {Outlet, useLocation} from "react-router-dom";
import './index.css';

export default function App() {
    const location = useLocation();
    const path = location.pathname;

    const isSpecialPage =
        path.startsWith('/admin')
        || path.startsWith('/profile')
        || path === '/login'
        || path === '/register'
        || path.includes('/checkout');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {/* <Layout.Root> */}
                {!isSpecialPage && (
                    <Layout.Header>
                        <Header/>
                    </Layout.Header>
                )}
                {/* <Layout.Main> */}
                    <Outlet />
                {/* </Layout.Main> */}
            {/* </Layout.Root> */}
        </ThemeProvider>
    );
}
