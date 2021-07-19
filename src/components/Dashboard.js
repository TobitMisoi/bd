import React from 'react';
import styled from 'styled-components'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardRow from './CardRow'
import Quickpay from './Quickpay'
import Transactions from './Transactions'

//MUI Imports
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//Styled Components
const Grid = styled.div`
width:100%;
`

const Row = styled.div`
display: flex;
justify-content:center;
`

//MUI Styles
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: 'auto',
        width: '100%',
    },
    listItemTextHeader: {
        fontWeight: 700,
        fontSize: '0.85rem'
    },
    listItemText: {
        fontSize: '0.85rem',
        fontWeight: 500
    },
    listItem: {
        marginTop: '-6px',
        marginBottom: '-6px',
        '&$selected': {
            color: 'red'
        }
    },
    nested: {
        paddingLeft: theme.spacing(1.5)
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            marginTop:'10vh'
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
}));

function Dashboard(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div style={{height:'10vh'}} className={classes.toolbar} />
            <Divider />
            <List>
                {['Banking', 'Single Payment', 'Bill Payments', 'Automatic Payments', 'Upcoming Payments'].map((text, index) => (
                    <ListItem classes={{ root: classes.listItem }} button key={text}>
                        {index === 0
                            ? <ListItemText classes={{ primary: classes.listItemTextHeader }} primary={text} />
                            : <ListItemText className={classes.nested} classes={{ primary: classes.listItemText }} primary={text} />}
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Open and Apply', 'Credit Cards', 'Loans & Mortgages', 'Investments', 'Insurance'].map((text, index) => (
                    <ListItem classes={{ root: classes.listItem }} button key={text}>
                        {index === 0
                            ? <ListItemText classes={{ primary: classes.listItemTextHeader }} primary={text} />
                            : <ListItemText className={classes.nested} classes={{ primary: classes.listItemText }} primary={text} />}
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Services', 'Documents', 'My Messages', 'Help', 'Contact Us'].map((text, index) => (
                    <ListItem classes={{ root: classes.listItem }} button key={text}>
                        {index === 0
                            ? <ListItemText classes={{ primary: classes.listItemTextHeader }} primary={text} />
                            : <ListItemText className={classes.nested} classes={{ primary: classes.listItemText }} primary={text} />}
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <Grid>
                <Row>
                    <CardRow />
                </Row>
                <Row>
                        <Transactions />
                        <Quickpay />
                </Row>
            </Grid>
        </div>
    );
}

export default Dashboard;