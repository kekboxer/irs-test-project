import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import ArchiveIcon from '@material-ui/icons/Archive';
import ListItemText from '@material-ui/core/ListItemText';
import {Link as RouterLink} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {AuthContext} from '../context/AuthContext'
import Axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    logoutBox: {
        position: "fixed",
        bottom: 10,
        left: 20,
        width: drawerWidth-40
    }
}));

function ListItemLink(props) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

const Navbar = () => {
    const classes = useStyles();
    const auth = useContext(AuthContext);

    const logout = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/api/auth/logout",
        })
            .then((res) => {
                auth.checkAuthentication();
            });
    }

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <Divider />
                <List>
                    <ListItemLink to="/main" primary="Главная" icon={<HomeIcon />}  />
                </List>
                <Divider />
                <List>
                    <ListItemLink to="/mpe_1gem" primary="Возможности поставок" icon={<ArchiveIcon />} />
                </List>
                <Box className={classes.logoutBox}>
                    <Button color="primary" variant="outlined" onClick={logout} fullWidth>Выйти</Button>
                </Box>
            </Drawer>
        </>
    );
}

export default Navbar;
