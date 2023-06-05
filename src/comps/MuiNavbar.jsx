import { useState, useEffect, useRef } from 'react';
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Button, InputBase, Toolbar } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { NavLink } from 'react-router-dom';
import HeaderAlert from './HeaderAlert';
import data from '../data/variables.json';
import kLogo from "../assets/kLogo.jpeg";

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


export default function MuiNavbar({showSearch, onSearchChange}) {
  const navItems = [["Productos", "/"]];
  const headerRef = useRef(null);
  const marginRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState("nada");

  const handleSearch = e => {
    e.preventDefault();
    onSearchChange(e.target.value);
  }

  useEffect(() => {
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.clientHeight);
        marginRef.current.style.height = headerHeight + "px";
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [headerHeight]);

  return (
    <>
      <AppBar className="pad05 vw100 fixed visible z30" id="bg1" ref={headerRef}>
        <Toolbar>
          <div className="flex w100 between">
            <div className="flex row centerY">
              <NavLink to="/"><img className="_navLogo" src={kLogo} alt={data.navLogoAlt} /></NavLink>
              <i className="m1 fs1-2 onlyDesktop">{data.slogan}</i>
            </div>
            <Box className="flex row evenly pad1 centerY">
              {navItems.map(item => 
                item[0] === "Productos" && !showSearch && 
                <a href={item[1]} key={item}>
                  <Button id="dark-txt" sx={{ color: "#fff" }}>
                    {item[0]}
                  </Button>
                </a>
              )}
              { showSearch && <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Buscar..."
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearch}
                />
              </Search> }
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      <HeaderAlert headerHeight={headerHeight} />
      <div ref={marginRef} className='bg2'></div>
      </>
  );
}
