import { Form, Input, Button, message } from "antd";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";

const BusinessSettingsPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [businessSetting, setBusinessSetting] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user && user.role_id !== 1) navigate("/");
  }, []);

  useEffect(() => {
    setIsLoading(true);
    httpClient.get("/business-settings").then((response) => {
      form.setFieldsValue(response.data.data);
      setBusinessSetting(response.data.data);
      setIsLoading(false);
    });
  }, []);

  const handleSave = () => {
    form.validateFields().then((values) => {
      httpClient.post("/business-settings", values).then((response) => {
        form.setFieldsValue(response.data.data);
        message.success("Succcess to save bussiness settings");
      });
    });
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
      {contextHolder}
      <Form labelCol={{ span: 8 }} labelAlign="left" form={form}>
        <Form.Item label="Selling Fee Percentage" name="selling_fee_percentage">
          <Input />
        </Form.Item>
        <Form.Item label="Selling Fee Minimum" name="selling_fee_minimum">
          <Input />
        </Form.Item>
        <Form.Item
          label="Shipping Fee Percentage"
          name="shipping_fee_percentage"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Shipping Fee Minimum" name="shipping_fee_minimum">
          <Input />
        </Form.Item>
        <Form.Item
          label="Transaction Fee Percentage"
          name="transaction_fee_percentage"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Transaction Fee Minimum"
          name="transaction_fee_minimum"
        >
          <Input />
        </Form.Item>
        <Form.Item label="VAT Rate" name="vat_rate">
          <Input />
        </Form.Item>

        <Button onClick={handleSave}>Save</Button>
      </Form>
    </>
  );
};

export default BusinessSettingsPage;
