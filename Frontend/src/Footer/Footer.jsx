import * as React from "react";
import { Typography, Box } from "@mui/material";

export default function Navbar() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        height: "50%",
        color: "#FFF",
        position: "fixed",
        width: "100%",
        fontWeight: "bold",
        justifyContent: "center",
        display: "flex",
        textAlign: "center"
      }}
    >
      <Typography sx={{ height: "50%", marginTop: "10px" }}>
        Ⓒ 2022 | All Rights Reserved by ShareIT
      </Typography>
    </Box>
  );
}
