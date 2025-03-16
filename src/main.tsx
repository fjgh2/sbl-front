import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import {GoogleOAuthProvider} from "@react-oauth/google";
import { store } from './app/redux/configureStore';
import {router} from "./app/routes/routes.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <GoogleOAuthProvider clientId="103104858818-t81fh5qs9t74135p630o4kkd7nbkiaj4.apps.googleusercontent.com">
                <RouterProvider router={router}/>
            </GoogleOAuthProvider>
        </Provider>
    </StrictMode>,
)
