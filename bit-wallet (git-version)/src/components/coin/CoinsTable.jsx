import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import {
  Container,
  TableCell,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import { CoinList } from "../../config/api";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import { CryptoState } from "../../CryptoContext";

// Function to format numbers with commas
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate(); // Use useNavigate

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // Fetching Coin Data
  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 3, fontFamily: "Montserrat" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>

        {/* Search Bar */}
        <Box display="flex" justifyContent="center" sx={{ marginBottom: 3 }}>
            <TextField
              label="Search For a Crypto Currency..."
              variant="outlined"
              sx={{
                width: "100%",
                maxWidth: 500,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black", // Black border
                  },
                  "&:hover fieldset": {
                    borderColor: "black", // Black border on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", // Black border when focused
                  },
                },
                "& .MuiInputBase-input": {
                  color: "black", // Black text color
                },
                "& .MuiInputLabel-root": {
                  color: "black", // Black label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black", // Keep label black when focused
                },
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
        </Box>


        {/* Table */}
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="crypto table">
              <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                      sx={{ color: "black", fontWeight: "700", fontFamily: "Montserrat" }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, page * 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        key={row.name}
                        onClick={() => navigate(`/coins/${row.id}`)}
                        sx={{
                          backgroundColor: "#16171a",
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#131111" },
                        }}
                      >
                        <TableCell component="th" scope="row" sx={{ display: "flex", gap: 2 }}>
                          <img src={row.image} alt={row.name} height="30px" style={{ marginBottom: 10 }} />
                          <Box>
                            <Typography variant="body1" sx={{ textTransform: "uppercase", fontSize: 18 }}>
                              {row.symbol}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "darkgrey" }}>
                              {row.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{symbol} {numberWithCommas(row.current_price.toFixed(2))}</TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: profit ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
  <Pagination
    count={Math.max(1, Math.ceil(handleSearch().length / 10))}
    sx={{
      "& .MuiPaginationItem-root": {
        color: "black", // Sets the page number text color to black
      },
      "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: "black", // Black background for selected page
        color: "white", // White text for contrast
      },
      "& .MuiPaginationItem-page:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Light black hover effect
      },
    }}
    onChange={(_, value) => {
      setPage(value);
      window.scroll(0, 450);
    }}
  />
</Box>

      </Container>
    </ThemeProvider>
  );
}
