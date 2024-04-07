import {Flex} from "antd";

const Header = ({children, justify = "space-between"}) => {
    // console.log(children)
    return (
        <Flex style={{marginBottom: 10, width: "100%",}} justify={justify} align={"center"}>
            {children}
        </Flex>
    )
}

export default Header