import React, { useEffect, useState } from "react";
import "../components/List_of_sellers.css";
import { IoArrowDownOutline } from "react-icons/io5";
import { IoMdArrowUp } from "react-icons/io";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List_of_sellers = () => {
  const navigate = useNavigate();
  // sorting and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("ascend");
  
  // data fetching from api
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `https://erp-backend-new-ketl.onrender.com/b2b/getAllSellers`,{}
        );
        setData(res.data); // Set the fetched data to the state
        console.log("sellerdata", res.data); // Log the actual data
      } catch (error) {
        console.log(error);
        toast.error("Error while fetching customers data.", {
          position: "top-center",
          
        });
      }
    };
  
    fetchData(); // Automatically call the async function when the component mounts
  }, []);
  
console.log("Fetched Data:",data);

  // const admin_seller_data = [
  //   {
  //     Sno: 1,
  //     Name: "ABC Traders",
  //     GST_No: "27AABCU9603R1Z5",
  //     PAN: "AABCU9603R",
  //     Phone_number: "+91-9876543210",
  //   },
  //   {
  //     Sno: 2,
  //     Name: "XYZ Enterprises",
  //     GST_No: "29XYZU1234Q1Z1",
  //     PAN: "XYZU1234Q",
  //     Phone_number: "+91-9123456789",
  //   },
  //   {
  //     Sno: 3,
  //     Name: "PQR Industries",
  //     GST_No: "09PQRU5678N2A7",
  //     PAN: "PQRU5678N",
  //     Phone_number: "+91-9234567890",
  //   },
  //   {
  //     Sno: 4,
  //     Name: "LMN Solutions",
  //     GST_No: "22LMNU9101P1B2",
  //     PAN: "LMNU9101P",
  //     Phone_number: "+91-9345678901",
  //   },
  //   {
  //     Sno: 5,
  //     Name: "RST Supplies",
  //     GST_No: "33RSTU2345J1C4",
  //     PAN: "RSTU2345J",
  //     Phone_number: "+91-9456789012",
  //   },
  // ];

  //download excel-------------------------------------------------

  const exportToExcel = () => {
    // Format the data for Excel export
    const formattedData = data.map((item) => ({
      Name: item.Name,
      "GST No": item.GST_No,
      PAN: item.PAN,
      "Phone Number": item.Phone_number,
      // View: item.status,
      // "Shipping Address": item.shippingAddress,
    }));

    // Create a worksheet from the formatted data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Set uniform column widths
    const wscols = [
      { wch: 15 },
      { wch: 15 },
      { wch: 25 },
      { wch: 12 },
      { wch: 17 },
      { wch: 50 },
    ];
    worksheet["!cols"] = wscols;

    // Create a new workbook and add the worksheet to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sellers Details");

    // Append current date and time to the filename
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")}`;
    const time = `${String(now.getHours()).padStart(2, "0")}-${String(
      now.getMinutes()
    ).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}`;
    const timestamp = `${date}_${time}`;
    const filename = `Sellers_Report_${timestamp}.xlsx`;

    // Write the file
    XLSX.writeFile(workbook, filename);
  };
  // ------------------------------------------------------------------------------
  
 
  // const filteredtableData = data
  //   .filter((e) => e.Name.toLowerCase().includes(searchQuery.toLowerCase()))
  //   .sort((a, b) => {
  //     if (sortOrder === "ascend") {
  //       return a.Name.localeCompare(b.Name);
  //     } else {
  //       return b.Name.localeCompare(a.Name);
  //     }
  //   });

  // const filteredtableData = Array.isArray(data)
  //   ? data
  //       .filter(
  //         (e) =>
  //           e.Name && e.Name.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //       .sort((a, b) => {
  //         if (sortOrder === "ascend") {
  //           return a.Name.localeCompare(b.Name);
  //         } else {
  //           return b.Name.localeCompare(a.Name);
  //         }
  //       })
  //   : [];

  const handleSort = () => {
    data.reverse()
    setSortOrder((prevSortOrder) =>
      prevSortOrder === "ascend" ? "descend" : "ascend"
    );
  };

  // When "View" is clicked, show Listofproducts component
  const handleViewClick = (seller) => {
    console.log(seller);
    
    navigate("/products", { state: { seller } });
  };

  return (
    <div className="seller-cont">
      <div className="seller-navbar">
        <h1>b2b</h1>
        <p>log out</p>
      </div>
      <div className="table--optns">
        <div className="table--optns1">
          <p>Sellers</p>
          <Button className="sort-button" onClick={handleSort}>
            {sortOrder === "ascend" ? <IoMdArrowUp /> : <IoArrowDownOutline />}
          </Button>
        </div>
        <div className="table--optns2">
          <input
            type="text"
            placeholder="Search Seller"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <Button
            icon={<DownloadOutlined />}
            // className="excel-download-button"
            onClick={exportToExcel}
          ></Button>
        </div>
      </div>
      <div className="seller-table-cont">
        <table className="seller-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>GST No</th>
              <th>PAN</th>
              <th>Phone number</th>
              <th>View Products</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e, index) => (
              <tr key={index}>
                <td>{e.CompanyName}</td>
                <td>{e.gstNo}</td>
                <td>{e.PAN}</td>
                <td>{e.phoneNo}</td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button onClick={() => handleViewClick(e)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List_of_sellers;
