import React, { useState,useEffect } from "react";
import { Card, Col, Row, Button,Modal, FloatButton, Input, Form, Select, message } from "antd";
import "./Listofproducts.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {InfoCircleTwoTone } from '@ant-design/icons';
const { Option } = Select;

const Listofproducts = () => {
  const location = useLocation();
  const seller = location.state?.seller;

  const [data, setData] = useState([]);
  const customerId= seller.customerId
  console.log(customerId);
  const [token,settoken]=useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1YmJ1ZHVzYW5hcHVkaUBnbWFpbC5jb20iLCJpYXQiOjE3MjU5NjcyNDksImV4cCI6MTcyNjA1MzY0OX0.p15u_bW53HZMCIAzMYqJYDtFpo_3MJ1Y7lh906mrdpU")

  const handleFetch = async () => {
    try {
      const res = await axios.post(
        `https://erp-backend-new-ketl.onrender.com/seller/getProductsBySellerId`,
        { customerId: seller.customerId }
      );
      setData(res.data); // Update state with fetched data      
    } catch (error) {
      console.error("Error fetching products by seller ID:", error);
    }
  };

  useEffect(() => {
      handleFetch(); // Fetch data when component mounts or seller.customerId changes
  }, [data]);


console.log("Prducts for Seller : ",data);


  const [products, setProducts] = useState(data);
  const [isEditing, setIsEditing] = useState(null);

  // Convert packaging object to array of {kg, bags} pairs for editing
    const handleEdit = (index) => {
      const productToEdit = data[index];
      if (productToEdit) {
        const packagingArray = Object.entries(productToEdit.packaging || {}).map(
          ([kg, bags]) => ({kg,bags,})
        );
        setIsEditing({ ...productToEdit, packaging: packagingArray, index });
      } else {
        console.error('Product not found at index:', index);
      }
    };
    

  // Convert array of {kg, bags} pairs back to object when saving
  const handleSave = async (values) => {
    const packagingObject = values.packaging.reduce((acc, { kg, bags }) => {
      acc[kg] = bags;
      return acc;
    }, {});
  
    const updatedProduct = {
      ...isEditing,
      ...values,
      packaging: packagingObject,
    };
  
    const updatedProducts = [...products];
    updatedProducts[isEditing.index] = updatedProduct;
    setProducts(updatedProducts);
    setIsEditing(null);
  
    console.log("Updated Product:", updatedProducts[isEditing.index]);
  
    try {
      const productID = updatedProduct.productId; // Ensure that productID is set correctly
      if (!productID) {
        throw new Error('Product ID is undefined');
      }
      await axios.put(`https://erp-backend-new-ketl.onrender.com/seller/updateProduct/${productID}`, {customerId:updatedProduct.customerId,
        description:updatedProduct.description,
        index:updatedProduct.index,
        isOrganic:updatedProduct.isOrganic,
        moisture:updatedProduct.moisture,
        packaging:updatedProduct.packaging,
        price:updatedProduct.price,
        productId:updatedProduct.productId,
        productImg:updatedProduct.productImg,
        productName:updatedProduct.productName,
        shelfLife:updatedProduct.shelfLife,
        units:updatedProduct.units,
        validity:updatedProduct.validity
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Product updated successfully');
      message.success("Product Details Updated Successfully")
    } catch (error) {
      console.error('Error updating product:', error);
      message.error("Product Details Not Updated")
    }
  };
  
  
  const formatDate = (isoDate) => {
    if (!isoDate) return ''; // Handle case where date is null or undefined
  
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  const handleDelete = async (productID) => {
    try {
      {
        await axios.delete(`https://erp-backend-new-ketl.onrender.com/seller/deleteProduct/${productID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      // Handle successful deletion (e.g., remove item from state)
      setData((prevData) => prevData.filter((product) => product.productId !== productID));
      console.log('Product deleted successfully');
      message.success("Prodict Deleted Successfully")
    }} catch (error) {
      console.error('Error deleting product:', error);
      message.error("Error Deleting Product")
      // Optionally show an error message to the user
    }
  };
  const [productToDelete, setProductToDelete] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showDeleteConfirm = (productID) => {
    setProductToDelete(productID);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setProductToDelete(null);
  };

  return (
    <>
      <h2 className="title"> Products from {seller.CompanyName}</h2>
      <Row gutter={16}>
        {data.map((product, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              className="card"
              cover={
                <div style={{ textAlign: "center" }}>
                  <img
                    alt={product.productName}
                    src={product.productImg}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "250px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              }
              actions={[
                <Button key="approve" type="primary">
                  Approve
                </Button>,
                <Button
                  key="decline"
                  danger
                  onClick={() => showDeleteConfirm(product.productId)} // Show confirmation modal
                >
                  Decline
                </Button>,
                <Button key="edit" onClick={() => handleEdit(index)}>
                  Edit
                </Button>,
              ]}
            >
              {isEditing && isEditing.index === index ? (
                <Form
                  layout="vertical"
                  initialValues={isEditing}
                  onFinish={handleSave}
                >
                  <Form.Item label="Product Name" name="productName">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Price/KG" name="price">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Units" name="units">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Organic" name="isOrganic">
                    <Select>
                      <Option value={1}>True</Option>
                      <Option value={0}>False</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Moisture" name="moisture">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Shelf Life" name="shelfLife">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Validity" name="validity">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Description" name="description">
                    <Input.TextArea rows={2} />
                  </Form.Item>
                  <Form.Item label="Packaging" name="packaging">
                    <Form.List name="packaging">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(
                            ({ key, name, fieldKey, ...restField }) => (
                              <Row key={key} gutter={16} align="middle">
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    label="KG per bag"
                                    name={[name, "kg"]}
                                    fieldKey={[fieldKey, "kg"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter KG per bag",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="e.g. 1 KG" />
                                  </Form.Item>
                                </Col>
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    label="No. of Bags"
                                    name={[name, "bags"]}
                                    fieldKey={[fieldKey, "bags"]}
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please enter the number of bags",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="e.g. 2" />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  <Button
                                    onClick={() => remove(name)}
                                    danger
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            )
                          )}
                          <Button type="dashed" onClick={() => add()} block>
                            Add Packaging
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>

                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form>
              ) : (
                <div style={{ textAlign: "left" }}>
                  <h3>{product.productName}</h3>
                  <p>
                    <strong>Price:</strong> {product.price} per KG
                  </p>
                  <p>
                    <strong>Units:</strong> {product.units}
                  </p>
                  <p>
                    <strong>Organic:</strong> {product.isOrganic ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Moisture:</strong> {product.moisture}
                  </p>
                  <p>
                    <strong>Shelf Life:</strong> {product.shelfLife}
                  </p>
                  <p>
                    <strong>Validity:</strong> {formatDate(product.validity)}
                  </p>
                  <p>
                    <strong>Description:</strong> {product.description}
                  </p>
                  <p>
                    <strong>Packaging:</strong>
                  </p>
                  <ul>
                    {Object.keys(product.packaging).map((kg) => (
                      <li key={kg}>
                        {kg}: {product.packaging[kg]} bags
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </Col>
        ))}
        <FloatButton.BackTop style={{ marginBottom: "40px" }} />
      </Row>
      <Modal
        title={<span><InfoCircleTwoTone /> Confirm Deletion</span>}
        visible={isModalVisible}
        onOk={()=>handleDelete(productToDelete)}
        onCancel={handleCancel}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </>
  );
};

export default Listofproducts;
