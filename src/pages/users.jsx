import { Button, Table } from "antd";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NewUserModal from "../components/NewUserModal";
import httpClient from "../utils/httpClient";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Area Code",
    dataIndex: "phone_area_code",
    key: "phone_area_code",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: ["role", "role_name"],
  },
];

const UserPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (user && user.role_id !== 1) navigate("/");
  }, []);

  useEffect(() => {
    setIsLoading(true);
    httpClient.get("/users").then((response) => {
      console.log("response", response.data.data);
      setUserList(
        response.data.data.map((item) => ({ key: item.id, ...item }))
      );
      setIsLoading(false);
    });
  }, []);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleAddNewUser = (user) => {
    setUserList([...userList, user]);
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex" }}>
        <h3>Loading data...</h3>
      </div>
    );
  }

  return (
    <>
      <Button
        type="primary"
        onClick={handleAddUser}
        style={{ marginBottom: 15 }}
      >
        Add User
      </Button>

      <Table columns={columns} dataSource={userList} />

      <NewUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onAddNewUser={handleAddNewUser}
      />
    </>
  );
};

export default UserPage;
