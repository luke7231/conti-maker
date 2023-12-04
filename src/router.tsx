import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screen/home";
import Result from "./screen/result";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
