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
        colorBgHeader: "#145DA0",
        colorBase: "#f1f1f1",
        borderRadius: 2,
        colorBorderSecondary: "#d6d9dc",
        colorBorder: "#d6d9dc",
        fontSize: 12,
        colorPrimary: "#00569E",
      },
      components: {
        Table: {
          rowHoverBg: "#fff",
          borderColor: "#d6d9dc",
          headerBg: "#f0f8ff",
        },
        Button: {
          primaryShadow: "",
        },
        Modal: {
          contentBg: "#fff",
          headerBg: "#fff",
        },
        Statistic: {},
        Menu: {},
        Divider: {
          colorBgBase: "#d6d9dc",
        },
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
