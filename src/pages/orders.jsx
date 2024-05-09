import { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  List,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Button,
  Card,
} from "antd";
import httpClient from "../utils/httpClient";
import moment from "moment";

const columns = [
  {
    title: "Order Id",
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "Order Date",
    dataIndex: "order_date",
    key: "order_date",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
];

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

  useEffect(() => {
    setIsLoading(true);
    httpClient.get("/orders").then((response) => {
      console.log("data", response.data.data);
      setOrderList(
        response.data.data.map((item) => ({ key: item.order_id, ...item }))
      );
      setIsLoading(false);
    });
  }, []);

  const handleSearch = () => {
    form.validateFields().then(({ order_date_range, ...values }) => {
      let start_date, end_date;
      if (order_date_range) {
        start_date = moment(new Date(order_date_range[0])).format("YYYY-MM-DD");
        end_date = moment(new Date(order_date_range[1])).format("YYYY-MM-DD");
      }
      const params = order_date_range
        ? { ...values, start_date, end_date }
        : values;

      setIsLoading(true);
      httpClient.get("/orders", { params }).then((response) => {
        setOrderList(
          response.data.data.map((item) => ({ key: item.order_id, ...item }))
        );
        setIsLoading(false);
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
    <Row gutter={30}>
      <Col span={12}>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} form={form}>
          <Form.Item label="Order Id" name="order_id">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Order Date" name="order_date_range">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Shop Name" name="shop_name">
            <Input />
          </Form.Item>
          <Form.Item label="Customer Name" name="customer_name">
            <Input />
          </Form.Item>
          <Form.Item label="Customer City" name="customer_city">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" onClick={handleSearch}>
              Search
            </Button>
          </Form.Item>
        </Form>

        <Table
          rowSelection={{
            type: "radio",
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedOrder(
                orderList.find((order) => order.key == selectedRowKeys)
              );
            },
          }}
          dataSource={orderList}
          columns={columns}
        />
      </Col>
      <Col span={12}>
        <Card title="Order Details" style={{ width: "100%", marginBottom: 20 }}>
          <p>Customer Name: {selectedOrder?.user?.name}</p>
          <p>Customer Email: {selectedOrder?.user?.email}</p>
          <p>
            Customer PhoneNumber:{" "}
            {selectedOrder?.user.phone_area_code &&
              `(${selectedOrder?.user?.phone_area_code || ""}) ${
                selectedOrder?.user?.phone_number || ""
              }`}
          </p>
        </Card>
        {selectedOrder && (
          <List
            header={<h2>Order Items</h2>}
            bordered
            dataSource={selectedOrder.order_items}
            renderItem={(item) => (
              <List.Item>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h5>Product Name: {item.product_name}</h5>
                  <h5>Product Price: {item.price}</h5>
                  <h5>Quantity: {item.quantity}</h5>
                </div>
              </List.Item>
            )}
          />
        )}
      </Col>
    </Row>
  );
};

export default Orders;
