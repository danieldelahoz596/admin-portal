import { useAuth } from "../hooks/useAuth";
import { Layout, Menu, theme } from "antd";
import { useMemo, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const menuItems = [{ key: "orders", label: "Orders" }];

const LayoutWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = useMemo(
    () =>
      user && user.role_id !== 1
        ? menuItems
        : [...menuItems, { key: "users", label: "Users" }],
    [user]
  );

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["orders"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default LayoutWrapper;
