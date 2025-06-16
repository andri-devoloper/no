"use client";

import Grid from "@mui/material/Grid";
import * as React from "react";
import { Box, Button, Modal, Typography, TextField } from "@mui/material";

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
    plusDI: 27.5,
    minusDI: 15.0,
    adx: 25.0,
    timeframe: "5m",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "symbol" || name === "timeframe" ? value : Number(value),
    }));
  };

  const handleSubmit = async () => {
    const { symbol, plusDI, minusDI, adx, timeframe } = form;

    // Validasi input
    if (!symbol || !timeframe || plusDI <= 0 || minusDI <= 0 || adx <= 0) {
      alert("Lengkapi semua data terlebih dahulu");
      return;
    }

    try {
      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan data webhook");
      }

      const result = await response.json();
      console.log("Webhook berhasil disimpan:", result);
      handleClose();

      // Reset form
      setForm({
        symbol: "",
        plusDI: 0,
        minusDI: 0,
        adx: 0,
        timeframe: "",
      });
    } catch (error) {
      console.error("Error saat menyimpan webhook:", error);
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
        New Webhook
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Webhook
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
              </Grid>
              <Grid size={6}>
                <TextField
                  label="-DI"
                  name="minusDI"
                  type="number"
                  value={form.minusDI}
                  onChange={handleChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="ADX"
                  name="adx"
                  type="number"
                  value={form.adx}
                  onChange={handleChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
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
