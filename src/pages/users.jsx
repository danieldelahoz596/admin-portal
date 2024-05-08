import { Button } from "antd";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NewUserModal from "../components/NewUserModal";

const UserPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.role_id !== 1) navigate("/");
  }, []);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button type="primary" onClick={handleAddUser}>
        Add User
      </Button>

      <NewUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default UserPage;
