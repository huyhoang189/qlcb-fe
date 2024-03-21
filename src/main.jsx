import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {ConfigProvider} from "antd";
import {store} from "./toolkits/store";
import {router} from "./routers/routers";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ConfigProvider
        theme={{
            token: {
                colorBgBase: "#F1F1F1",
                colorBgHeader: "#00193B",
                colorBase: "#fff",
                borderRadius: 2,
                colorBorderSecondary: "#d6d9dc",
                colorBorder: "#d6d9dc",
                fontSize: 13,
                fontFamily: "Archivo",
                // colorPrimary: "#00193B",
            },
            components: {}
        }}
    >
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </ConfigProvider>
);
