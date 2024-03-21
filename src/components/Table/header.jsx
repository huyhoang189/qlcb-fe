import {Flex} from "antd";

const Header = ({children}) => {
    console.log(children)
    return (
        <Flex style={{marginBottom: 10, width: "100%"}} justify={"space-between"} align={"center"}>
            {children}
        </Flex>
    )
}

export default Header