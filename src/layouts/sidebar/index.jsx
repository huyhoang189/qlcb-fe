import {Flex, Image, Menu, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import appSlice from "../../toolkits/app/slice.js"
import {publicRouter} from "../../routers/pageRouter.jsx";
import {DrawerWrapper} from "./style.js";
import {useNavigate} from "react-router-dom";
import logo from "../../assets/dths.png"

const Siderbar = () => {
    const {menuCollapse} = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onToggleSider = () => {
        dispatch(appSlice.actions.toggleSiderbar())
    }
    const onClickSelectItem = (e) => {
        const url = e?.keyPath.reverse().join("\\");
        navigate(url)
        dispatch(appSlice.actions.toggleSiderbar())

    }
    return (
        <DrawerWrapper
            placement={"left"} open={menuCollapse} onClose={onToggleSider} width="300px"
            headerStyle={{display: "none"}}>
            <Flex vertical="horizonal" justify={"space-between"} align={"center"}>
                <Image src={logo} preview={false} width={100}/>
                <Typography.Text style={{textAlign: "center", fontWeight: "bold"}}>HỆ THỐNG QUẢN LÝ <br/> CÁN BỘ NGÀNH
                    ĐIỀU
                    TRA</Typography.Text>
                <Menu
                    items={publicRouter}
                    mode="inline"
                    onClick={onClickSelectItem}
                />
            </Flex>


        </DrawerWrapper>
    )

};

export default Siderbar;
