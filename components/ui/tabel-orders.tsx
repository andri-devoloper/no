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
  id: number;
  symbol: string;
  timeframe: string;
  plusDI: number;
  minusDI: number;
  adx: number;
  takeProfit: number;
  stopLoss: number;
  leverage: string;
  createdAt: string;
}

export default function BasicTable() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/strategies");
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
              <TableCell>Timeframe</TableCell>
              <TableCell>+DI</TableCell>
              <TableCell>-DI</TableCell>
              <TableCell>ADX</TableCell>
              <TableCell>TP</TableCell>
              <TableCell>SL</TableCell>
              <TableCell>Leverage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.symbol}</TableCell>
                <TableCell>{order.timeframe}</TableCell>
                <TableCell>{order.plusDI}</TableCell>
                <TableCell>{order.minusDI}</TableCell>
                <TableCell>{order.adx}</TableCell>
                <TableCell>{order.takeProfit}</TableCell>
                <TableCell>{order.stopLoss}</TableCell>
                <TableCell>{order.leverage}</TableCell>
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
