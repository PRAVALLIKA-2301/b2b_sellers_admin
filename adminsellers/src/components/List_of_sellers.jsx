import React, { useState } from "react";
import "../components/List_of_sellers.css";
import { IoArrowDownOutline } from "react-icons/io5";
import { IoMdArrowUp } from "react-icons/io";
import { Button } from "antd";
import Listofproducts from "./Listofproducts"; // Import Listofproducts component
// import { useNavigate } from "react-router-dom";

const List_of_sellers = () => {
  // const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("ascend");
  const [selectedSeller, setSelectedSeller] = useState(null); // State to track selected seller
  const [showProducts, setShowProducts] = useState(false); // State to toggle product view
  const admin_seller_data = [
    {
      Sno: 1,
      Name: "ABC Traders",
      GST_No: "27AABCU9603R1Z5",
      PAN: "AABCU9603R",
      Phone_number: "+91-9876543210",
    },
    {
      Sno: 2,
      Name: "XYZ Enterprises",
      GST_No: "29XYZU1234Q1Z1",
      PAN: "XYZU1234Q",
      Phone_number: "+91-9123456789",
    },
    {
      Sno: 3,
      Name: "PQR Industries",
      GST_No: "09PQRU5678N2A7",
      PAN: "PQRU5678N",
      Phone_number: "+91-9234567890",
    },
    {
      Sno: 4,
      Name: "LMN Solutions",
      GST_No: "22LMNU9101P1B2",
      PAN: "LMNU9101P",
      Phone_number: "+91-9345678901",
    },
    {
      Sno: 5,
      Name: "RST Supplies",
      GST_No: "33RSTU2345J1C4",
      PAN: "RSTU2345J",
      Phone_number: "+91-9456789012",
    },
  ];

  const filteredtableData = admin_seller_data
    .filter((e) => e.Name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "ascend") {
        return a.Name.localeCompare(b.Name);
      } else {
        return b.Name.localeCompare(a.Name);
      }
    });

  const handleSortToggle = () => {
    setSortOrder((prevSortOrder) =>
      prevSortOrder === "ascend" ? "descend" : "ascend"
    );
  };

  // When "View" is clicked, show Listofproducts component
  const handleViewClick = (seller) => {
    setSelectedSeller(seller); // Set the selected seller data
    setShowProducts(true); // Show the product page
    // navigate("/");
  };

  return (
    <div className="seller-cont">
      {/* Show Listofproducts component if "View" is clicked */}
      {showProducts ? (
        <Listofproducts seller={selectedSeller} />
      ) : (
        <>
          <div className="seller-navbar">
            <h1>b2b</h1>
            <p>log out</p>
          </div>
          <div className="table--optns">
            <div className="table--optns1">
              <p>Sellers</p>
              <Button className="sort-button" onClick={handleSortToggle}>
                {sortOrder === "ascend" ? (
                  <IoMdArrowUp />
                ) : (
                  <IoArrowDownOutline />
                )}
              </Button>
            </div>

            <input
              type="text"
              placeholder="Search Seller"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="seller-table-cont">
            <table className="seller-table">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>GST No</td>
                  <td>PAN</td>
                  <td>Phone number</td>
                  <td>View</td>
                </tr>
              </thead>
              <tbody>
                {filteredtableData.length > 0 ? (
                  filteredtableData.map((e, index) => (
                    <tr key={index}>
                      <td>{e.Name}</td>
                      <td>{e.GST_No}</td>
                      <td>{e.PAN}</td>
                      <td>{e.Phone_number}</td>
                      <td>
                        <Button onClick={() => handleViewClick(e)}>View</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default List_of_sellers;
