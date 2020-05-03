import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { userService } from '../_services';
import { userConstants } from '../_constants';
import { userActions, alertActions, scriptActions } from '../_actions';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
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


function AddUserComponent() {
    const instituciones = useSelector(state => state.instituciones);
    const classes = useStyles();

    const modelUser = {
        Identificacion: '',
        Nombre: '',
        Apellido: '',
        Email: '',
        Telefono: '',
        Institucion: '',
        Usuario: '',
        Contrasena: '',
        Activo: true
    };

    const [user, setUser] = useState(modelUser);
    const [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleOnBlur(e) {
        
        const { name, value } = e.target;
        if(!value)return;
        switch (name) {
            case 'Identificacion':
                validateUserById(value);
                break;
            case 'Email':
                validateUserByEmail(value);
                break;
            case 'Usuario':
                validateUserByUser(value);
                break;

            default:
                break;
        }
    }

    function handleChangePass(e) {
        const { value } = e.target;
        setPassword(value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validatePass(user.Contrasena, password)) {
            dispatch(alertActions.error({message:'Las contraseñas no coinciden', open: true}));
            return;
        }
        setSubmitted(true);

        if (user.Identificacion &&
            user.Nombre &&
            user.Apellido &&
            user.Email &&
            user.Telefono &&
            user.Institucion &&
            user.Usuario &&
            user.Contrasena) {
            dispatch(userActions.register(user));
            clearData();
        }
    }

    function validateUserById(id){

        userService.getById(id)
        .then(
            userbyid => {
                dispatch(success(userbyid))
                if (userbyid.length>0) {
                    dispatch(alertActions.error({message:'El id '+ id +' ya existe', open: true}));
                    setUser(user => ({ ...user, 'Identificacion': '' }));                  
                }
            },
            error => dispatch(failure(error.toString()))
        );

        function request() { return { type: userConstants.GETBYID_REQUEST } }
        function success(userbyid) { return { type: userConstants.GETBYID_SUCCESS, userbyid } }
        function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
    }

    function validateUserByEmail(email){

        userService.getByEmail(email)
        .then(
            userbyemail => {
                dispatch(success(userbyemail))
                if (userbyemail.length>0) {
                    dispatch(alertActions.error({message:'El email '+ email +' ya existe', open: true}));
                    setUser(user => ({ ...user, 'Email': '' }));                  
                }
            },
            error => dispatch(failure(error.toString()))
        );

        function request() { return { type: userConstants.GETBYEMAIL_REQUEST } }
        function success(userbyemail) { return { type: userConstants.GETBYEMAIL_SUCCESS, userbyemail } }
        function failure(error) { return { type: userConstants.GETBYEMAIL_FAILURE, error } }
    }

    function validateUserByUser(username){

        userService.getByUser(username)
        .then(
            userbyusername => {
                dispatch(success(userbyusername))
                if (userbyusername.length>0) {
                    dispatch(alertActions.error({message:'El usuario '+ username +' ya existe', open: true}));
                    setUser(user => ({ ...user, 'Usuario': '' }));                  
                }
            },
            error => dispatch(failure(error.toString()))
        );

        function request() { return { type: userConstants.GETBYUSERNAME_REQUEST } }
        function success(userbyusername) { return { type: userConstants.GETBYUSERNAME_SUCCESS, userbyusername } }
        function failure(error) { return { type: userConstants.GETBYUSERNAME_FAILURE, error } }
    }

    function validatePass(pPass1, pPass2) {
        return pPass1 === pPass2;
    }

    function clearData() {
        setUser(modelUser);
        setPassword('');
    }



    function renderOptions() {
        return instituciones.items.map((dt, i) => {
            return (
                <MenuItem
                    label="Select a country"
                    value={dt.IdInstitucion}
                    key={i} name={dt.Nombre}>{dt.Nombre}</MenuItem>

            );
        });
    }

    
    return (
        <Grid container component="main" className={classes.root}>
           
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">Datos de usuario</Typography>
                    <form className={classes.form} onSubmit={handleSubmit} validate="true" >
                        <div className="row">
                            <div className="col-md-4 col-xs-12 col-lg-4">
                                <TextField
                                    onBlur={handleOnBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    value={user.Identificacion}
                                    type="number"
                                    margin="normal"
                                    required
                                    id="Identificacion"
                                    label="Identificación"
                                    name="Identificacion"
                                    autoFocus
                                />
                            </div>
                            <div className="col-md-4 col-xs-12 col-lg-4">
                                <TextField
                                    onChange={handleChange}
                                    fullWidth
                                    value={user.Nombre}
                                    margin="normal"
                                    required
                                    id="Nombre"
                                    label="Nombre"
                                    name="Nombre"
                                />
                            </div>
                            <div className="col-md-4 col-xs-12 col-lg-4">
                                <TextField
                                    onChange={handleChange}
                                    fullWidth
                                    value={user.Apellido}
                                    margin="normal"
                                    required
                                    id="Apellido"
                                    label="Apellido"
                                    name="Apellido"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-xs-12 col-lg-4">
                                <TextField
                                    onBlur={handleOnBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    value={user.Email}
                                    type="email"
                                    margin="normal"
                                    required
                                    id="Email"
                                    label="Email"
                                    name="Email"
                                />
                            </div>
                            <div className="col-md-4 col-xs-12 col-lg-4">
                                <TextField
                                    onChange={handleChange}
                                    fullWidth
                                    value={user.Telefono}
                                    type="number"
                                    margin="normal"
                                    required
                                    id="Telefono"
                                    label="Teléfono"
                                    name="Telefono"
                                />
                            </div>
                            <div className="col-md-4 col-xs-12 col-lg-4">
                                <FormControl className={classes.formControl} fullWidth style={{ marginTop: '16px' }}>
                                    <InputLabel id="demo-simple-select-error-label">Institución</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-error-label"
                                        id="demo-simple-select-error"
                                        value={user.Institucion}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'Institucion',
                                            id: 'age-native-simple',
                                            margin: "normal",
                                        }}

                                    >
                                        <MenuItem value="">
                                            <em>Seleccionar...</em>
                                        </MenuItem>
                                        {instituciones.items && renderOptions()}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-xs-12 col-lg-4">
                                <TextField
                                    onBlur={handleOnBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    value={user.Usuario}
                                    margin="normal"
                                    required
                                    id="Usuario"
                                    label="Usuario"
                                    name="Usuario"
                                />
                            </div>
                            <div className="col-md-4 col-xs-12 col-lg-4">
                                <TextField
                                    onChange={handleChange}
                                    fullWidth
                                    value={user.Contrasena}
                                    type="password"
                                    margin="normal"
                                    required
                                    id="Contrasena"
                                    label="Contraseña"
                                    name="Contrasena"
                                />
                            </div>
                            <div className="col-md-4 col-xs-12 col-lg-4">
                                <TextField
                                    onChange={handleChangePass}
                                    fullWidth
                                    value={password}
                                    type="password"
                                    margin="normal"
                                    required
                                    id="ContrasenaC"
                                    label="Confirma Contraseña"
                                    name="ContrasenaC"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-xs-12 col-lg-6">
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={clearData}
                                >
                                    Limpiar
                        </Button>
                            </div>
                            <div className="col-md-6 col-xs-12 col-lg-6">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Guardar
                        </Button>
                            </div>
                        </div>
                    </form>

                </div>
            </Grid>
        </Grid>
    );
}

export { AddUserComponent };