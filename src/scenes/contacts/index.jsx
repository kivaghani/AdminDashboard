import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from 'axios';
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then((response) => {
        const productsWithFormattedTags = response.data.products.map(product => ({
          ...product,
          tags: product.tags.join(", "), // Join tags array into a comma-separated string
        }));
        setProducts(productsWithFormattedTags);
      })
      .catch((error) => {
        console.error('Error fetching the products data:', error);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "price", headerName: "Price", type: "number", flex: 1 },
    { field: "discountPercentage", headerName: "Discount (%)", type: "number", flex: 1 },
    { field: "rating", headerName: "Rating", type: "number", flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", flex: 1 },
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "sku", headerName: "SKU", flex: 1 },
    { field: "availabilityStatus", headerName: "Availability", flex: 1 },
    { field: "tags", headerName: "Tags", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="PRODUCTS"
        subtitle="List of Products"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={products}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
