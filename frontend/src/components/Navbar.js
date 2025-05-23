import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
}));

const Logo = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: '1.5rem',
    textDecoration: 'none',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(2),
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
}));

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMobileMenuAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        logout();
        navigate('/login');
    };

    return (
        <StyledAppBar position="sticky">
            <Container maxWidth="lg">
                <StyledToolbar>
                    <Logo component={RouterLink} to="/">
                        Blog App
                    </Logo>


                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        {user ? (
                            <>
                                <NavButton component={RouterLink} to="/create">
                                    Create Blog
                                </NavButton>
                                <NavButton component={RouterLink} to="/my-blogs">
                                    My Blogs
                                </NavButton>
                                <IconButton
                                    onClick={handleProfileMenuOpen}
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                        {user.name?.[0]?.toUpperCase() || <AccountCircleIcon />}
                                    </Avatar>
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <NavButton component={RouterLink} to="/login">
                                    Login
                                </NavButton>
                                <NavButton
                                    component={RouterLink}
                                    to="/signup"
                                    variant="contained"
                                    color="primary"
                                >
                                    Sign Up
                                </NavButton>
                            </>
                        )}
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMobileMenuOpen}
                            sx={{
                                backgroundColor: 'black',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                                }
                            }}
                        >
                            <MenuIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Box>
                </StyledToolbar>
            </Container>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            <Menu
                anchorEl={mobileMenuAnchorEl}
                open={Boolean(mobileMenuAnchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {user ? (
                    <>
                        <MenuItem component={RouterLink} to="/create" onClick={handleMenuClose}>
                            Create Blog
                        </MenuItem>
                        <MenuItem component={RouterLink} to="/my-blogs" onClick={handleMenuClose}>
                            My Blogs
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem component={RouterLink} to="/login" onClick={handleMenuClose}>
                            Login
                        </MenuItem>
                        <MenuItem component={RouterLink} to="/signup" onClick={handleMenuClose}>
                            Sign Up
                        </MenuItem>
                    </>
                )}
            </Menu>
        </StyledAppBar>
    );
};

export default Navbar; 