import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { alertActions, scriptActions } from '../../_actions';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    rootImage: {
        maxWidth: 345,
    },
    paper: {
        margin: theme.spacing(2, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textcontrol: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



const imgBase = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIABAMAAAAGVsnJAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAA9QTFRF////4hsb4hsbmZmZ4hsbWMYoTwAAAAN0Uk5TAAgQLxhesgAAAp9JREFUeNrt27ENwyAURVFnhGwQeQVW8P4zpUUWilLY+oZ3bg3N+YgKtnZqG9QGLbMOAAAAAAAAAAAAAAAAAAAACARIDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgCIAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADI4AEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID5AEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMngAAAAAAADgwt5dkQBHFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgToA6iVqABxwFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmBngdF/cBAADATD0e4O7LHwAAAAAAAAAAAAAAAAAAAAAAAACAMIA/8nscAAAAAAAAAAAAAAAAAAAAAAAAAIAKAI+lAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHUB6vJSFAAAAAAAAMgF2LsiAWoDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABRACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGTwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwHwAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAYPAAAAAAAArAvQBv3auMo6AAAAAAAAAAAAAAAAAAAAIBDgC7tK/ATcy9KHAAAAAElFTkSuQmCC'

function AddScriptsComponent() {

    const classes = useStyles();    
    const scriptsList = useSelector(state => state.scriptsList);    
    const dispatch = useDispatch();  
    
    function handleCapture({ target }) {
        var wFiles = target.files;
        var count = scriptsList.items.length;
        debugger;
        for (var i = 0; i < wFiles.length; i++) { //for multiple files          
            count += 1;
            (function(file) {
                var name = file.name;
                var reader = new FileReader();  
                reader.onload = function(e) {
                    console.log(e);
                    var text = e.target.result; 
                    const wScript = {
                        Id:scriptsList.items.length + 1,
                        Name:name,
                        Text: text,
                        ErrorMessage: ''
                    };
                    
                    dispatch(scriptActions.Add(wScript));
                }
                reader.readAsText(file, "UTF-8");
            })(wFiles[i]);
        }
    }

    return (
        <div className={classes.paper}>
                <div className="row">
                    <div className="col-md-6 col-xs-12 col-lg-6">
                    </div>
                    <div className="col-md-6 col-xs-12 col-lg-6">
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            component="label"
                            className={classes.submit}
                        >
                            Load Files
                            <input
                                        type="file"
                                        accept=".sql"
                                        multiple
                                        style={{ display: "none" }}
                                        id="icon-button-photo"
                                        onChange={handleCapture}
                                    />
                </Button>
                    </div>                            
                </div>

        </div>
        
    );
}

export { AddScriptsComponent };