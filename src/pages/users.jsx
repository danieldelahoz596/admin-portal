import { Button, Table, Space, Image } from "antd";
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
    title: "Role",
    dataIndex: ["role", "role_name"],
    key: "role",
  },
  {
    title: "Photo Front",
    dataIndex: "photo_front",
    key: ["userVerification", "photo_front"],
    render: (_, record) => (
      <Image
        width={200}
        src={record.userVerification && record.userVerification.photo_front}
        placeholder={
          <Image
            preview={false}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            width={200}
          />
        }
      />
    ),
  },
  {
    title: "Photo Back",
    dataIndex: "photo_back",
    key: ["userVerification", "photo_back"],
    render: (_, record) => (
      <Image
        width={200}
        src={record.userVerification && record.userVerification.photo_back}
        placeholder={
          <Image
            preview={false}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            width={200}
          />
        }
      />
    ),
  },
  {
    title: "Photo",
    dataIndex: "selfie_photo",
    key: ["userVerification", "selfie_photo"],
    render: (_, record) => (
      <Image
        width={200}
        src={record.userVerification && record.userVerification.selfie_photo}
        placeholder={
          <Image
            preview={false}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            width={200}
          />
        }
      />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button>Approval</Button>
        <Button>Reject</Button>
      </Space>
    ),
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
        response.data.data
          .filter((item) => item.selling_request)
          .map((item) => ({ key: item.id, ...item }))
      );
      setIsLoading(false);
    });
  }, []);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleAddNewUser = (user) => {
    setUserList([...userList, { ...user, key: user.id }]);
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
