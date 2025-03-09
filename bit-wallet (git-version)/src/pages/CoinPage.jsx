import { LinearProgress, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/coin/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/coin/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoin();
  }, [id]);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      p={2}
      sx={{ backgroundColor: "black", minHeight: "100vh" }} // Added black background
    >
      {/* Sidebar */}
      <Box
        width={{ xs: "100%", md: "30%" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRight={{ md: "2px solid grey" }}
        p={2}
        sx={{ color: "white" }} // Make text white in the sidebar
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" fontWeight="bold" mb={2} fontFamily="Montserrat">
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            textAlign: "justify",
            paddingBottom: 2,
          }}
          dangerouslySetInnerHTML={{ __html: coin?.description?.en?.split(". ")[0] }}
        />
        <Box width="100%" mt={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h5" fontWeight="bold">Rank:</Typography>
            <Typography variant="h5">{numberWithCommas(coin?.market_cap_rank)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h5" fontWeight="bold">Current Price:</Typography>
            <Typography variant="h5">
              {symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5" fontWeight="bold">Market Cap:</Typography>
            <Typography variant="h5">
              {symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]?.toString().slice(0, -6))}M
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Coin Information Section */}
      <Box flex={1}>
        <CoinInfo coin={coin} />
      </Box>
    </Box>
  );
};

export default CoinPage;
