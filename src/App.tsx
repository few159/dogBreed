import { ToastContainer } from "react-toastify";
import Router from "./routes/router";

import 'react-toastify/dist/ReactToastify.css';


export default function App() {
    return (
        <>
            <ToastContainer />
            <Router />
        </>
    )
}