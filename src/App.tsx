import React from "react";
import Router from "./router";
import Layout from "./layout";
import * as amplitude from "@amplitude/analytics-browser";

amplitude.init("7b2ef4fff198401428b4a5ead249d79a");

function App() {
    return (
        <Layout>
            <Router />
        </Layout>
    );
}

export default App;
