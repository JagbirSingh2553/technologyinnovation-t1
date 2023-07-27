import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Modal from "@mui/material/Modal";
import AdminLogin from "./AdminLogin";
import LoginPopup from "./LoginPopup";
import { BrowserRouter } from "react-router-dom";
import RegistrationPopup from "./RegistrationPopup";

function ResponsiveAppBar() {
    const [name, setName] = React.useState("");
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [openPopup, setOpenPopup] = React.useState(false);
    const [showAdminLogin, setShowAdminLogin] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(true);
    const [showRegister, setShowRegister] = React.useState(false);
    const [isPopupClosed, setIsPopupClosed] = React.useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = React.useState(false);
    const [didUserLogout, setDidUserLogout] = React.useState(false);


    const pages = [
        {
            name: "Events",
            path: "/events",
        },
        {
            name: "Newsletter",
            path: "/newsletter",
            element: <h1>Welcome to Newsletter!</h1>,
        },
        {
            name: "Feedback",
            path: "/feedback",
        },        
        {
            name: "Admin Dashboard",
            path: "/admin/login",
        },
        {
            name: isUserLoggedIn ? "Logout" : "Login",
            path: isUserLoggedIn ? "/" : "/login",
        },


    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenPopup = (page) => {
        setAnchorElNav(page);
        setOpenPopup(true);
        setIsUserLoggedIn(false);
        if (page.name === "Admin Login") {
            setShowAdminLogin(true);
            setShowLogin(false);
        } else {
            setShowAdminLogin(false);
            setShowLogin(true);
        }
    };

    const handleClosePopup = () => {
        setShowAdminLogin(false);
        setShowLogin(false);
        setShowRegister(false);
        setOpenPopup(false);
        localStorage.setItem('popupClosed', "true");
        setIsPopupClosed(true);
    };

    const toggleForms = () => {
        setShowLogin((prev) => !prev);
        setShowRegister((prev) => !prev);
    };

    const showLoginForm = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const showRegisterForm = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    const handleRegisterSuccess = (name) => {
        setIsUserLoggedIn(true);
        setName(name)
        handleClosePopup();
    };

    const handleLoginSuccess = (name) => {
        setIsUserLoggedIn(true);
        setName(name);
        handleClosePopup();
    };

    const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsUserLoggedIn(false); // Set isUserLoggedIn to false
    localStorage.setItem('username', 'admin');
    setName('admin'); // Set the name state to 'admin'
    handleClosePopup();
    };


    const handleLogout = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem('username'); // Remove the username from local storage
    setDidUserLogout(true); // Set didUserLogout to true
    handleCloseNavMenu();
    };

    const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('username'); // Remove the username from local storage
    setDidUserLogout(true); // Set didUserLogout to true
    handleCloseNavMenu();
    };
    React.useEffect(() => {
        const username = localStorage.getItem('username');
        if (username && !didUserLogout) { // Check didUserLogout before setting isUserLoggedIn to true
            setIsPopupClosed(true);
            setIsUserLoggedIn(true);
        }
        const handleScroll = () => {
            if (!localStorage.getItem('popupClosed') && !username && window.scrollY > 100) {
                setOpenPopup(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [didUserLogout]); // Add didUserLogout to the dependency array


    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NewspaperIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Dakiya
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => handleOpenPopup(page)}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={page.name === "Logout" ? (isAdminLoggedIn ? handleAdminLogout : handleLogout) : handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                                href={page.path}
                            >
                                {page.name}
                            </Button>
                        ))}
                        {isAdminLoggedIn && (
                            <Button
                                onClick={handleAdminLogout}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                Admin Logout
                            </Button>
                        )}
                    </Box>

                    <Button
                        sx={{ my: 2, color: "white", display: { xs: "flex", md: "none" } }}
                        onClick={() =>
                            handleOpenPopup(
                                pages.find((page) => page.name === (isUserLoggedIn ? "Logout" : "Login"))
                            )
                        }
                    >
                        {isUserLoggedIn ? "Logout" : "Login"}
                    </Button>

                    <Modal
                        open={openPopup && (!isUserLoggedIn || showRegister)}
                        onClose={handleClosePopup}
                        aria-labelledby="popup-title"
                        aria-describedby="popup-description"
                        disableScrollLock
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                boxShadow: 24,
                                p: 2,
                            }}
                        >
                            <Box display="flex" justifyContent="flex-end" mb={2}>
                                <Button onClick={handleClosePopup}>Close</Button>
                            </Box>
                            <Box mt={2}>
                                <BrowserRouter>
                                    {showLogin && <LoginPopup showRegisterForm={showRegisterForm} onLoginSuccess={handleLoginSuccess} />}
                                    {showRegister && <RegistrationPopup showLoginForm={showLoginForm} onRegisterSuccess={handleRegisterSuccess} />}
                                    {showAdminLogin && (
                                        <AdminLogin onAdminLoginSuccess={handleAdminLoginSuccess} />
                                    )}
                                </BrowserRouter>
                            </Box>
                        </Box>
                    </Modal>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
