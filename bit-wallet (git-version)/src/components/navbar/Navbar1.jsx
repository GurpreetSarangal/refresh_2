import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList() {
  return (
    <List className=" p-0 lg:flex-row lg:p-1 text-black">
      <Typography as="div" variant="h6" className="font-medium">
        <Link to="/" className="flex items-center gap-2 py-1 pr-4">
          <ListItem>Home</ListItem>
        </Link>
      </Typography>
      <Typography as="div" variant="h6" className="font-medium">
        <Link to="/crypto" className="flex items-center gap-2 py-1 pr-4">
          <ListItem>Live Crypto</ListItem>
        </Link>
      </Typography>
      <Typography as="div" variant="h6" className="font-medium">
        <Link to="/support" className="flex items-center gap-2 py-1 pr-4">
          <ListItem>Contact Us</ListItem>
        </Link>
      </Typography>
    </List>
  );
}

export function Navigationbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGetStarted = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      // Optionally decode token and check expiration
      navigate("/user-pannel");
    } catch (err) {
      // On error, navigate to login
      navigate("/login");
    }
  };

  return (
    <Navbar className="w-full px-4 py-0 bg-light backdrop-blur-md" id="navbar">
      <div className="flex items-center justify-between text-black">
        <Typography as="div" variant="h6" className="mr-4 cursor-pointer lg:ml-2 flex items-center gap-2">
          <i className="fas fa-search-dollar text-[#00d084] text-4xl"></i>
          DracoShield
        </Typography>

        <div className="hidden lg:block">
          <NavList />
        </div>

        <div className="hidden lg:flex">
          <Button
            size="sm"
            className="text-white font-semibold rounded px-5 py-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            style={{
              backgroundImage: "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
            }}
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>

        <IconButton
          variant="text"
          className="lg:hidden text-black"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button
            size="sm"
            fullWidth
            className="bg-gradient-to-r from-[#00d084] to-orange-200 text-white font-semibold px-5 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default Navigationbar;
