import React from "react";
import { useDispatch } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PowerIcon from "@material-ui/icons/Power";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { makeStyles } from "@material-ui/core/styles";

import { custom } from "devextreme/ui/dialog";

import { scriptService } from "../../_services/index";


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

function handleMessage(message, title) {
    let wDialog = custom({
      title: title ? title : "System",
      messageHtml: message,
      buttons: [
        {
          text: "Ok",
          onClick: (e) => {
            return true;
          },
        },
      ],
    });
    return wDialog;
  }

function ConnectionComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  

  function startConnect() {
    if (validateDataConnection()) {
        scriptService.connect(props.dataConnection).then(
        (res) => {          
          props.onLoadDataBases(res.result);
          sessionStorage.setItem(
            props.keyStorage,
            JSON.stringify(props.dataConnection)
          );
          handleMessage("Connection started ok")
            .show()
            .then((dialogResult) => {
              console.log(dialogResult);
            });
        },
        (error) => {
          console.log(error);
          handleMessage("Connection error").show();
        }
      );
    }
  }

  function validateDataConnection() {
    if (!props.dataConnection.Server) {
      handleMessage("Server can't be empty").show();
      return false;
    } else if (!props.dataConnection.User) {
      handleMessage("User can't be empty").show();
      return false;
    } else if (!props.dataConnection.Password) {
      handleMessage("Password can't be empty").show();
      return false;
    } else {
      return true;
    }
  }

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      component={Paper}
      elevation={6}
      square
      style={{ marginBottom: "10px",padding: "5px" }}
    >
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {props.title || 'Data Connection'}
        </Typography>
        <form className={classes.form} validate="true">
          <div className="row">
            <div className="col-md-4 col-xs-12 col-lg-4">
              <TextField
                onChange={props.onHandleChange}
                fullWidth
                value={props.dataConnection.Server}
                margin="normal"
                required
                
                label="Server"
                name="Server"
              />
            </div>
            <div className="col-md-4 col-xs-12 col-lg-4">
              <TextField
                onChange={props.onHandleChange}
                fullWidth
                value={props.dataConnection.User}
                type="text"
                margin="normal"
                required
                
                label="User"
                name="User"
              />
            </div>
            <div className="col-md-4 col-xs-12 col-lg-4">
              <TextField
                onChange={props.onHandleChange}
                fullWidth
                value={props.dataConnection.Password}
                type="password"
                margin="normal"
                required
               
                label="Password"
                name="Password"
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-6 col-xs-12 col-lg-6"></div>
            <div className="col-md-3 col-xs-12 col-lg-3">
              <Button
                type="button"
                style={{ backgroundColor: "#032556" }}
                fullWidth
                variant="contained"
                color="primary"
                onClick={startConnect}
                startIcon={<PowerIcon />}
                className={classes.submit}
              >
                Connect
              </Button>
            </div>
            <div className="col-md-3 col-xs-12 col-lg-3">
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={props.onClearDataConnection}
                startIcon={<BackspaceIcon />}
                className={classes.submit}
              >
                Clear
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Grid>
  );
}

export { ConnectionComponent };
