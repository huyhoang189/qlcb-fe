import {Breadcrumb, Divider, Row} from "antd";
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CustomBreadcrumb = ({items = []}) => (
    <Row>
        <Breadcrumb style={{margin: "auto", marginLeft: 0}}>
            {items.map((e, i) => (
                <Breadcrumb.Item key={i + 1}>
                    {i + 1 === items.length ? (
                        <span style={{fontWeight: "bold"}}>{e?.title}</span>
                    ) : (
                        <Link to={e?.href || "#"}>{e?.title}</Link>
                    )}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
        <Divider style={{marginTop: 10, marginBottom: 10}}/>
    </Row>
);

export default CustomBreadcrumb;