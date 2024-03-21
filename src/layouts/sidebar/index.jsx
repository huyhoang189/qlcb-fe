import {Menu} from "antd";
import {useDispatch, useSelector} from "react-redux";
import appSlice from "../../toolkits/app/slice.js"
import {publicRouter} from "../../routers/pageRouter.jsx";
import {DrawerWrapper} from "./style.js";
import {useNavigate} from "react-router-dom";

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
            <Menu
                items={publicRouter}
                mode="inline"
                onClick={onClickSelectItem}
            />
            

        </DrawerWrapper>
    )

};

export default Siderbar;
