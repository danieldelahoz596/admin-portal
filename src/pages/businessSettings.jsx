import { Form } from "antd";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";

const BusinessSettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [businessSetting, setBusinessSetting] = useState(null);

  useEffect(() => {
    if (user && user.role_id !== 1) navigate("/");
  }, []);

  useEffect(() => {
    setIsLoading(true);
    httpClient.get("/business-settings").then((response) => {
      console.log("response", response.data.data);
      setBusinessSetting(response.data.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: "flex" }}>
        <h3>Loading data...</h3>
      </div>
    );
  }

  return (
    <>
      <Form labelCol={{ span: 8 }} labelAlign="left">
        <Form.Item label="Selling Fee Percentage">
          {businessSetting?.selling_fee_percentage}
        </Form.Item>
        <Form.Item label="Selling Fee Minimum">
          {businessSetting?.selling_fee_minimum}
        </Form.Item>
        <Form.Item label="Shipping Fee Percentage">
          {businessSetting?.shipping_fee_percentage}
        </Form.Item>
        <Form.Item label="Shipping Fee Minimum">
          {businessSetting?.shipping_fee_minimum}
        </Form.Item>
        <Form.Item label="Transaction Fee Percentage">
          {businessSetting?.transaction_fee_percentage}
        </Form.Item>
        <Form.Item label="Transaction Fee Minimum">
          {businessSetting?.transaction_fee_minimum}
        </Form.Item>
        <Form.Item label="VAT Rate">{businessSetting?.vat_rate}</Form.Item>
      </Form>
    </>
  );
};

export default BusinessSettingsPage;
