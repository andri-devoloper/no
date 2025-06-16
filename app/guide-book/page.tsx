// pages/api-guide.js
import React from "react";
import { Typography, Paper, Box, Divider } from "@mui/material";

const ApiGuide = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Panduan Integrasi API
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Panduan ini menjelaskan cara mengintegrasikan API endpoint dalam
        aplikasi berbasis React dan Next.js untuk:
      </Typography>
      <ul>
        <li>Mengirim dan menerima data strategi trading</li>
        <li>Menerima webhook untuk strategi tertentu</li>
      </ul>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Struktur Endpoint
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          1. Endpoint Strategi
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          POST /api/strategies
        </Typography>
        <Typography variant="body1" gutterBottom>
          Mengirim data strategi ke backend.
        </Typography>
        <Typography variant="subtitle2">Contoh data yang dikirim:</Typography>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "12px",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
          {`{
  "symbol": "BTCUSDT",
  "timeframe": "5m",
  "plus_di_threshold": 25,
  "minus_di_threshold": 20,
  "adx_minimum": 20,
  "take_profit_percent": 2,
  "stop_loss_percent": 1,
  "leverage": "10x"
}`}
        </pre>

        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          GET /api/strategies
        </Typography>
        <Typography variant="body1">
          Mengambil semua data strategi yang tersimpan.
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          2. Endpoint Webhook
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          POST /api/webhook
        </Typography>
        <Typography variant="body1" gutterBottom>
          Mengirim sinyal analisa ke backend.
        </Typography>
        <Typography variant="subtitle2">Contoh data yang dikirim:</Typography>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "12px",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
          {`{
  "symbol": "BTCUSDT",
  "plusDI": 27.5,
  "minusDI": 15.0,
  "adx": 25.0,
  "timeframe": "5m"
}`}
        </pre>

        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          GET /api/webhook
        </Typography>
        <Typography variant="body1">
          Mengambil data webhook yang sudah masuk.
        </Typography>
      </Paper>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Implementasi di React + Next.js
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          1. Menyimpan Strategi Baru
        </Typography>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "12px",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
          {`async function saveStrategy(data) {
  const response = await fetch('/api/strategies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}`}
        </pre>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          2. Mengambil Strategi
        </Typography>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "12px",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
          {`async function getStrategies() {
  const response = await fetch('/api/strategies');
  return await response.json();
}`}
        </pre>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          3. Mengirim Webhook
        </Typography>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "12px",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
          {`async function sendWebhook(data) {
  const response = await fetch('/api/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}`}
        </pre>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          4. Menampilkan Webhook
        </Typography>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "12px",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
          {`async function getWebhooks() {
  const response = await fetch('/api/webhook');
  return await response.json();
}`}
        </pre>
      </Paper>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body1">
        Dengan mengikuti panduan ini, Anda dapat mengintegrasikan API strategies
        dan webhook ke dalam aplikasi Next.js dengan React secara efisien.
        Pastikan semua endpoint tersedia di backend agar aplikasi dapat berjalan
        tanpa error.
      </Typography>
    </Box>
  );
};

export default ApiGuide;
