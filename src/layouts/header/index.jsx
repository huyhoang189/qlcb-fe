import {Button, Flex, theme} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import appSlice from "../../toolkits/app/slice.js"

const {useToken} = theme;
const Header = () => {
    const {token} = useToken();
    const dispatch = useDispatch()

    const collapseSiderbar = () => {
        dispatch(appSlice.actions.toggleSiderbar())

    }
    return (
        <Flex
            gap="middle"
            vertical
            style={{
                backgroundColor: token.colorBgHeader,
                color: token.colorBase,
                height: 60,
                padding: 10,
            }}
            justify="center"

        >
            <Button
                icon={<MenuOutlined style={{color: "#007aff"}}/>}
                type="none"
                style={{border: "1px solid #007aff"}}
                onClick={collapseSiderbar}
            />
        </Flex>
    );
};

export default Header;
