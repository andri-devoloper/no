"use client";

import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import DrawerMenu from "./DrawerMenu";
import DrawerHeader from "./DrawerHeader";
import CustomAppBar from "./AppBar";
import MainContent from "./MainContent";

export default function PersistentDrawerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <DrawerMenu open={open} handleDrawerClose={handleDrawerClose} />
      <MainContent open={open}>
        <DrawerHeader />
        {children}
      </MainContent>
    </Box>
  );
}
