import {
  message,
  DatePicker,
  Modal,
  Form,
  InputNumber,
  Input,
  Select,
} from "antd";
import httpClient from "../utils/httpClient";
import moment from "moment";

const NewUserModal = ({ isModalOpen, setIsModalOpen, onAddNewUser }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    form.validateFields().then((values) => {
      httpClient
        .post("/auth/register", {
          ...values,
          password: "123456",
          birthday: moment(values.birthday).format("YYYY-MM-DD"),
        })
        .then(({ data }) => {
          setIsModalOpen(false);
          onAddNewUser(data.data);
          messageApi.success("Success to create a user");
        })
        .catch(
          ({
            response: {
              data: { message },
            },
          }) => {
            messageApi.error(message);
          }
        );
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Add New User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              { required: true, message: "Please input select the gender!" },
            ]}
          >
            <Select
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Date of Birth" name="birthday">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone area code"
            name="phone_area_code"
            rules={[
              { required: true, message: "Please input your phone area code!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phone_number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Street"
            name="street"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Province"
            name="province"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Region"
            name="region"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Zip Code"
            name="zip_code"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewUserModal;
