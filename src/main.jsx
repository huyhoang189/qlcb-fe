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
        colorBgBase: "#fff",
        colorBgHeader: "#78b43d",
        colorBase: "#fff",
        borderRadius: 2,
        colorBorderSecondary: "#78b43d",
        colorBorder: "#d6d9dc",
        fontSize: 12,
        // fontFamily: "Archivo",
        colorPrimary: "#3c811e",
      },
      components: {
        Table: {
          rowHoverBg: "#fff",
          borderColor: "#d6d9dc",
          headerBg: "#f1f2f3",
        },
        Button: {
          primaryShadow: "",
        },
        Modal: {
          contentBg: "#fff",
          headerBg: "#fff",
        },
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
