import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { HomePage } from '../Views/HomePage';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ListScriptsPage } from '../Views/ExecuteScript';
import { CompareScriptPage } from '../Views/CompareScript';

const useStyles = makeStyles(theme => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function App() {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    const pStyle = {
        marginBottom: '0'
    };

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    const handleClose = () => {
        dispatch(alertActions.success({ message: 'Inserción correcta', open: false }));
    };

    return (
        <div className="h-100" >
            {alert.message &&
                <Dialog
                    open={alert.open}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Mensaje del sistema"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {alert.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">Ok</Button>
                    </DialogActions>
                </Dialog>
            }

            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/execute" component={ListScriptsPage} />
                    <Route path="/compare" component={CompareScriptPage} />
                </Switch>
            </Router>
        </div>
    );
}

export { App };