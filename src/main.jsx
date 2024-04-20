import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "./toolkits/store";
import { router } from "./routers/routers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      token: {
        colorBgBase: "#F1F1F1",
        colorBgHeader: "#78b43d",
        colorBase: "#fff",
        borderRadius: 2,
        colorBorderSecondary: "#d6d9dc",
        colorBorder: "#d6d9dc",
        fontSize: 11,
        fontFamily: "Archivo",
        colorPrimary: "#3c811e",
      },
      components: {
        Table: {
          rowHoverBg: "#fff",
        },
        Button: {
          primaryShadow: "",
        },
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
