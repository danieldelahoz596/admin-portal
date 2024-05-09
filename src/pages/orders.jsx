import { useState, useEffect } from "react";
import httpClient from "../utils/httpClient";

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    httpClient.get("/orders").then((response) => {
      console.log("response", response);
      setOrderList(response.data.data);
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
    <div>
      <h1>Orders</h1>
    </div>
  );
};

export default Orders;
