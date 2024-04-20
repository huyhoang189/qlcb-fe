import {Button, Flex, theme} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import appSlice from "../../toolkits/App/slice.js"

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
                icon={<MenuOutlined style={{color: "#3c811e",}}/>}
                type="none"
                style={{border: "2px solid #3c811e"}}
                onClick={collapseSiderbar}
            />
        </Flex>
    );
};

export default Header;
