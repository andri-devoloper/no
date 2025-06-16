"use client";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [form, setForm] = React.useState({
    symbol: "BTCUSDT",
    timeframe: "5m",
    plusDI: 25,
    minusDI: 20,
    adx: 20,
    takeProfit:2,
    stopLoss: 2,
    leverage: "10x",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "symbol" || name === "timeframe" || name === "leverage"
          ? value
          : Number(value),
    }));
  };

  const handleSubmit = async () => {
    const isEmpty = !form.symbol || !form.timeframe || !form.leverage;

    if (
      isEmpty ||
      form.plusDI <= 0 ||
      form.minusDI <= 0 ||
      form.adx <= 0 ||
      form.takeProfit <= 0 ||
      form.stopLoss <= 0
    ) {
      alert("Lengkapi semua data terlebih dahulu");
      return;
    }

    try {
      const response = await fetch("/api/strategies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan strategi");
      }

      const result = await response.json();
      console.log("Strategi berhasil disimpan:", result);
      handleClose();
      setForm({
        symbol: "",
        timeframe: "",
        plusDI: 0,
        minusDI: 0,
        adx: 0,
        takeProfit: 0,
        stopLoss: 0,
        leverage: "",
      });
    } catch (error) {
      console.error("Error saat menyimpan strategi:", error);
    }
  };

  return (
    <div>
      <Button
        sx={{
          paddingX: 2,
          paddingY: 1,
          backgroundColor: "#3b82f6",
          color: "white",
          borderRadius: "8px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#2563eb",
          },
        }}
        onClick={handleOpen}
      >
        New Strategi
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Strategi
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              spacing={2}
            >
              <Grid size={6}>
                <TextField
                  label="Symbol"
                  name="symbol"
                  value={form.symbol}
                  onChange={handleChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Timeframe"
                  name="timeframe"
                  value={form.timeframe}
                  onChange={handleChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="+DI"
                  name="plusDI"
                  type="number"
                  value={form.plusDI}
                  onChange={handleChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="-DI"
                  name="minusDI"
                  type="number"
                  value={form.minusDI}
                  onChange={handleChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="ADX"
                  name="adx"
                  type="number"
                  value={form.adx}
                  onChange={handleChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Take Profit (%)"
                  name="takeProfit"
                  type="number"
                  value={form.takeProfit}
                  onChange={handleChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Stop Loss (%)"
                  name="stopLoss"
                  type="number"
                  value={form.stopLoss}
                  onChange={handleChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />

                <TextField
                  label="Leverage"
                  name="leverage"
                  value={form.leverage}
                  onChange={handleChange}
                  select
                  fullWidth
                  sx={{ marginBottom: 2 }}
                >
                  {["1x", "2x", "5x", "10x", "20x"].map((lev) => (
                    <MenuItem key={lev} value={lev}>
                      {lev}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
