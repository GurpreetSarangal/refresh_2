import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Swap = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/user-pannel"); // adjust the path as per your routing
  };

  return (
    <Box
      sx={{
        padding: "40px",
        maxWidth: "600px",
        margin: "auto",
        borderRadius: "8px",
        textAlign: "center",
        mt: 10,
      }}
    >
      <Paper sx={{ p: 4 }}>
        <Typography variant="h2" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          The function is in development phase.
        </Typography>
       
      </Paper>
    </Box>
  );
};

export default Swap;
