import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Button, InputBase, Toolbar } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { NavLink } from 'react-router-dom';
import data from '../data/variables.json';
import kLogo from "../assets/kLogo.jpeg";
import "../css/Custom.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function MuiNavbar() {
  const contact = `https://api.whatsapp.com/send?phone=${data.contact.phone_test}&text=${data.contact.reachout}`
  const navItems = [["Productos", "/"], ["Preguntas Frecuentes", "/faq"], ["Contacto", contact]];
  return (
      <AppBar class="bg1 pad05 vw100 fixed z30">
        <Toolbar>
          <div className="flex w100 between">
            <NavLink to="/"><img className="navLogo" src={kLogo} alt="Kundalini CBD" /></NavLink>
            <Box className="flex row evenly pad1 centerY">
              {navItems.map((item) => (
                <a href={item[1]}>
                  <Button id="myBlack-txt" key={item} sx={{ color: "#fff" }}>
                    {item[0]}
                  </Button>
                </a>
              ))}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
  );
}
