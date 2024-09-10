import React, { useState } from 'react';
import { Card, Col, Row, Button, FloatButton, Input, Form, Select } from 'antd';
import './Listofproducts.css';

const { Option } = Select;

const Listofproducts = () => {
    
  const initialProducts = [
    {
      productImg: 'https://res.cloudinary.com/drqiw6wyl/image/upload/v1725859683/toordal_tedikn.jpg',
      productName: 'ToorDal',
      price: '130',
      units: '150 KG',
      isOrganic: true,
      moisture: '10%',
      shelfLife: '1 year',
      validity: '2025-12-31',
      description: 'A perennial legume that belongs to the Fabaceae family, which is also known as pigeon pea or split pigeon pea, arhar dal or red gram dal',
      packaging: { '1 KG': 2, '5 KG': 10 },
    },
    {
      productImg: 'https://res.cloudinary.com/drqiw6wyl/image/upload/v1725859683/2k660c8g_green-moong_625x300_12_July_23_cddszi.jpg',
      productName: 'Moong Dal',
      price: '120',
      units: '140 KG',
      isOrganic: true,
      moisture: '8%',
      shelfLife: '6 months',
      validity: '2024-06-30',
      description: 'The split version of whole mung beans also known as green gram (with skin).',
      packaging: { '2 KG': 4, '10 KG': 15 },
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [isEditing, setIsEditing] = useState(null);

  // Convert packaging object to array of {kg, bags} pairs for editing
  const handleEdit = (index) => {
    const productToEdit = products[index];
    const packagingArray = Object.entries(productToEdit.packaging).map(([kg, bags]) => ({
      kg,
      bags,
    }));
    setIsEditing({ ...productToEdit, packaging: packagingArray, index });
  };

  // Convert array of {kg, bags} pairs back to object when saving
  const handleSave = (values) => {
    const packagingObject = values.packaging.reduce((acc, { kg, bags }) => {
      acc[kg] = bags;
      return acc;
    }, {});

    const updatedProducts = [...products];
    updatedProducts[isEditing.index] = { ...isEditing, ...values, packaging: packagingObject };
    setProducts(updatedProducts);
    setIsEditing(null);
    console.log('Updated Product:', updatedProducts[isEditing.index]);
  };

  return (
    <>
      <h2 className="title">List Of Products</h2>
      <Row gutter={16}>
        {products.map((product, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              className="card"
              cover={
                <div style={{ textAlign: 'center' }}>
                  <img
                    alt={product.productName}
                    src={product.productImg}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '250px',
                      objectFit: 'cover',
                      borderRadius:'10px',
                    }}
                  />
                </div>
              }
              actions={[
                <Button key="approve" type="primary">Approve</Button>,
                <Button key="decline" danger>Decline</Button>,
                <Button key="edit" onClick={() => handleEdit(index)}>Edit</Button>,
              ]}
            >
              {isEditing && isEditing.index === index ? (
                <Form layout="vertical" initialValues={isEditing} onFinish={handleSave}>
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
                      <Option value={true}>True</Option>
                      <Option value={false}>False</Option>
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
                          {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Row key={key} gutter={16} align="middle">
                              <Col span={10}>
                                <Form.Item
                                  {...restField}
                                  label="KG per bag"
                                  name={[name, 'kg']}
                                  fieldKey={[fieldKey, 'kg']}
                                  rules={[{ required: true, message: 'Please enter KG per bag' }]}
                                >
                                  <Input placeholder="e.g. 1 KG" />
                                </Form.Item>
                              </Col>
                              <Col span={10}>
                                <Form.Item
                                  {...restField}
                                  label="No. of Bags"
                                  name={[name, 'bags']}
                                  fieldKey={[fieldKey, 'bags']}
                                  rules={[{ required: true, message: 'Please enter the number of bags' }]}
                                >
                                  <Input placeholder="e.g. 2" />
                                </Form.Item>
                              </Col>
                              <Col span={4}>
                                <Button onClick={() => remove(name)} danger>Remove</Button>
                              </Col>
                            </Row>
                          ))}
                          <Button type="dashed" onClick={() => add()} block>Add Packaging</Button>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>

                  <Button type="primary" htmlType="submit">Save</Button>
                </Form>
              ) : (
                <div style={{ textAlign: 'left' }}>
                  <h3>{product.productName}</h3>
                  <p><strong>Price:</strong> {product.price} per KG</p>
                  <p><strong>Units:</strong> {product.units}</p>
                  <p><strong>Organic:</strong> {product.isOrganic ? 'Yes' : 'No'}</p>
                  <p><strong>Moisture:</strong> {product.moisture}</p>
                  <p><strong>Shelf Life:</strong> {product.shelfLife}</p>
                  <p><strong>Validity:</strong> {product.validity}</p>
                  <p><strong>Description:</strong> {product.description}</p>
                  <p><strong>Packaging:</strong></p>
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
        <FloatButton.BackTop style={{ marginBottom: '40px' }} />
      </Row>
    </>
  );
};

export default Listofproducts;
