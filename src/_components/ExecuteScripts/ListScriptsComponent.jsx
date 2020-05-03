import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import config from 'config';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging
} from 'devextreme-react/data-grid';
import { AddScriptsComponent } from './AddScriptsComponent';
import { scriptActions, dataBaseActions } from '../../_actions';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '30vh',
    },
    button:{
        marginTop: '25px'
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
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


function ListScriptsComponent() {

    const classes = useStyles();
    const scriptsList = useSelector(state => state.scriptsList);
    const dataBaseList = useSelector(state => state.dataBaseList);
    const dispatch = useDispatch();  
    const pageSizes = [5, 10, 25, 50, 100];

    useEffect(() => {
        dispatch(scriptActions.Init());
    }, []);

    function executeStart(){
        var wScripts = scriptsList.items;
        for (let i = 0; i < wScripts.length; i++) {
            const element = wScripts[i];
            var wText = element.Text.split('GO');
            for (let index = 0; index < wText.length; index++) {
                const script = wText[index];
                executeScript(script)
                .then(
                    res => {                        
                        if (res.result.hasOwnProperty('originalError')) {
                            debugger;
                            wScripts[i].ErrorMessage = res.result.originalError.info.message;
                        }else{
                            if(wScripts[i].ErrorMessage == '')wScripts[i].ErrorMessage = res.result;
                        }
                        dispatch(scriptActions.Update(wScripts[i]));
                    },
                    error => {
                        console.log(error);
                    }
                );
            }    
        }
        console.log(wScripts);
    }

    function executeScript(pScript){
        
        var data = {
            server:dataConnection.Server,
            user:dataConnection.User,
            password:dataConnection.Password,
            database: dataConnection.DataBase,
            script:pScript
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
    
        return fetch(`${config.apiUrl}/executemain`, requestOptions).then(handleResponse);
    }

    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }

    function startConnect(){
        connect()
        .then(
            res => { 
                console.log(res);
                dispatch(dataBaseActions.loadAll(res.result));
                alert('Connection Ok');
            },
            error => {
                debugger;
                console.log(error);
            }
        );
    }

    function connect(){
        var data = {
            server:dataConnection.Server,
            user:dataConnection.User,
            password:dataConnection.Password
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
    
        return fetch(`${config.apiUrl}/connection`, requestOptions).then(handleResponse);
    }
    
    const modelDataConnection = {
        Server: '',
        User: '',
        Password: '',
        DataBase: 'master'
    };

    const [dataConnection, setDataConnection] = useState(modelDataConnection);
    

    function handleChange(e) {
        const { name, value } = e.target;
        setDataConnection(dataConnection => ({ ...dataConnection, [name]: value }));
    }

    function renderOptions() {
        return dataBaseList.items.map((dt, i) => {
            return (
                <MenuItem
                    label="Select DataBase"
                    value={dt.name}
                    key={i} name={dt.name}>{dt.name}</MenuItem>

            );
        });
    }
    
    return (
        <div className="col-lg-12  h-100">
            <Grid container component="main" className={classes.root}>
           
                <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">Data Connection</Typography>
                        <form className={classes.form} validate="true" >
                            <div className="row">
                                <div className="col-md-4 col-xs-12 col-lg-4">
                                    <TextField
                                        onChange={handleChange}
                                        fullWidth
                                        value={dataConnection.Server}
                                        margin="normal"
                                        required
                                        id="Server"
                                        label="Server"
                                        name="Server"
                                    />
                                </div>
                                <div className="col-md-4 col-xs-12 col-lg-4">
                                    <TextField
                                        onChange={handleChange}
                                        fullWidth
                                        value={dataConnection.User}
                                        type="text"
                                        margin="normal"
                                        required
                                        id="User"
                                        label="User"
                                        name="User"
                                    />
                                </div>
                                <div className="col-md-4 col-xs-12 col-lg-4">
                                    <TextField
                                        onChange={handleChange}
                                        fullWidth
                                        value={dataConnection.Password}
                                        type="password"
                                        margin="normal"
                                        required
                                        id="Password"
                                        label="Password"
                                        name="Password"
                                    />
                                </div>                                
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6 col-xs-12 col-lg-6">
                                    
                                </div>
                                <div className="col-md-3 col-xs-12 col-lg-3">
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"                                        
                                        onClick={startConnect}
                                    >
                                        Connect
                            </Button>
                                </div>
                                <div className="col-md-3 col-xs-12 col-lg-3">
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        
                                    >
                                        Clear
                            </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
                    
            <AddScriptsComponent />
            
            <h3>Scripts</h3>
            {scriptsList.items &&
                <DataGrid id="gridContainer"
                    dataSource={scriptsList.items}
                    showColumnLines={true}
                    rowAlternationEnabled={true}
                    allowColumnResizing={true}
                    columnAutoWidth={true}>
                    showBorders={true}>
                    <GroupPanel visible={false} />
                    <Grouping autoExpandAll={false} />
                    <Column dataField="Id" caption="Id" width="50px" visible={false} />
                    <Column dataField="Name" />
                    {/* <Column dataField="Path" /> */}
                    <Column dataField="Text" width="30%"/>
                    <Column dataField="ErrorMessage" width="200px"/>
                    <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                    <Paging defaultPageSize={5} />
                </DataGrid>
            }

            <br/>
            <div className="row">                    
            <div className="col-md-6 col-xs-12 col-lg-6">
            </div>
                <div className="col-md-3 col-xs-12 col-lg-3">
                    <FormControl className={classes.formControl}  fullWidth style={{ marginTop: '16px' }}>
                        <InputLabel id="demo-simple-select-error-label">Select DataBase</InputLabel>
                        <Select
                            labelId="demo-simple-select-error-label"
                            id="demo-simple-select-error"
                            value={dataConnection.DataBase}
                            onChange={handleChange}
                            inputProps={{
                                name: 'DataBase',
                                id: 'age-native-simple',
                                margin: "normal",
                            }}

                        >
                            <MenuItem value="">
                                <em>Select...</em>
                            </MenuItem>
                            {dataBaseList.items && renderOptions()}
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-3 col-xs-12 col-lg-3">
                    <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={executeStart}>Execute</Button>
                </div>
            </div>
        </div>
    );
}

export { ListScriptsComponent };