import React from "react";

import { AppBar, Container, Toolbar, Typography, Select, MenuItem } from "@mui/material";
import { CryptoState } from "../../CryptoContext"; 
const Header = () => {
  const { currency, setCurrency } = CryptoState(); 



  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent", marginTop:"20px", boxShadow: "none" }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "Black" }}
           >
            Live Crypto Chart
          </Typography>
          <Select
            variant="outlined"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            sx={{ width: 100, height: 40, marginRight: 2, color: "Black", borderColor: "Black" }}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
