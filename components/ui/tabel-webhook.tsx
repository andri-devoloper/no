"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
} from "@mui/material";

interface Order {
  id: string;
  symbol: string;
  action: string;
  price_entry: number;
  tp_price: number;
  sl_price: number;
  leverage: string;
  timeframe: string;
  timestamp: string;
}

export default function BasicTable() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const paginatedData = orders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const pageCount = Math.ceil(orders.length / rowsPerPage);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="tabel orders">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Entry Price</TableCell>
              <TableCell>TP</TableCell>
              <TableCell>SL</TableCell>
              <TableCell>Leverage</TableCell>
              <TableCell>Timeframe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.symbol}</TableCell>
                <TableCell>{order.action}</TableCell>
                <TableCell>{order.price_entry}</TableCell>
                <TableCell>{order.tp_price}</TableCell>
                <TableCell>{order.sl_price}</TableCell>
                <TableCell>{order.leverage}</TableCell>
                <TableCell>{order.timeframe}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-end mt-4">
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(event, value) => setPage(value)}
            showFirstButton
            showLastButton
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "50%",
                color: "#000",
              },
              "& .Mui-selected": {
                backgroundColor: "#1d4ed8",
                color: "#fff",
              },
            }}
          />
        </Box>
      </div>
    </Box>
  );
}
