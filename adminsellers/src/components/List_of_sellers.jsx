import React from "react";
import "../components/List_of_sellers.css"

const List_of_sellers = () => {
  const admin_seller_data = [
    {
      Sno: 1,
      Name: "ABC Traders",
      GST_No: "27AABCU9603R1Z5",
      PAN: "AABCU9603R",
      Phone_number: "+91-9876543210",
      // View_products: "https://example.com/products/abc-traders",
    },
    {
      Sno: 2,
      Name: "XYZ Enterprises",
      GST_No: "29XYZU1234Q1Z1",
      PAN: "XYZU1234Q",
      Phone_number: "+91-9123456789",
      // View_products: "https://example.com/products/xyz-enterprises",
    },
    {
      Sno: 3,
      Name: "PQR Industries",
      GST_No: "09PQRU5678N2A7",
      PAN: "PQRU5678N",
      Phone_number: "+91-9234567890",
      // View_products: "https://example.com/products/pqr-industries",
    },
    {
      Sno: 4,
      Name: "LMN Solutions",
      GST_No: "22LMNU9101P1B2",
      PAN: "LMNU9101P",
      Phone_number: "+91-9345678901",
      // View_products: "https://example.com/products/lmn-solutions",
    },
    {
      Sno: 5,
      Name: "RST Supplies",
      GST_No: "33RSTU2345J1C4",
      PAN: "RSTU2345J",
      Phone_number: "+91-9456789012",
      // View_products: "https://example.com/products/rst-supplies",
    },
  ];
  return (
    <div className="seller-cont">
      <div className="seller-navbar">
        <h1>b2b</h1>
        <p>log out</p>
      </div>
      <div className="seller-table">
        <table>
          <th>
            <tr>
              {/* <td>S.no</td> */}
              <td>Name</td>
              <td>GST No</td>
              <td>PAN</td>
              <td>Phone number</td>
              <td>View products</td>
            </tr>
            <tbody>
              {admin_seller_data.map((e, index) => (
                <tr key={index}>
                  {/* <td>{e.Sno}</td> */}
                  <td>{e.Name}</td>
                  <td>{e.GST_No}</td>
                  <td>{e.PAN}</td>
                  <td>{e.Phone_number}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </th>
        </table>
      </div>
    </div>
  );
};

export default List_of_sellers;
