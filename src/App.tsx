import React from "react";
import Router from "./router";
import styled from "styled-components";
import { getResponsiveMaxWidth } from "./utils/layout-util";
const Wrapper = styled.section`
    height: 100vh;
    width: 100%;
    margin: 0 auto !important;
    // background: linear-gradient(180deg, #9397ff, #aeb1ff 30%, #fff 75%, #fff);
    background: linear-gradient(180deg, #c4c8ff, #d9dbff 30%, #fff 75%, #fff);
    ${getResponsiveMaxWidth()};
`;
function App() {
    return (
        <Wrapper>
            <Router />
        </Wrapper>
    );
}

export default App;
