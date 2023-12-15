import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screen/home";
import Result from "./screen/result";
import Intro from "./screen/intro";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<Result />} />
                <Route path="/intro" element={<Intro />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
