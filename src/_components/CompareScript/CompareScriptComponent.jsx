import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ConnectionComponent } from "../ExecuteScripts";
import { CompareOptionsComponent } from "./CompareOptionsComponent";
import { CheckBox, SelectBox, TextArea } from "devextreme-react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function CompareScriptComponent() {
  const classes = useStyles();

  const modelDataConnection = {
    Server: "",
    User: "",
    Password: "",
    DataBase: "",
  };
  const [dataConnection, setDataConnection] = useState(
    JSON.parse(sessionStorage.getItem("DATA_CONNECTION")) || modelDataConnection
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setDataConnection((dataConnection) => ({
      ...dataConnection,
      [name]: value,
    }));
  }

  function clearDataConnect() {
    const wDataConnection = {
      Server: "",
      User: "",
      Password: "",
      DataBase: "",
    };
    setDataConnection(wDataConnection);
    sessionStorage.setItem("DATA_CONNECTION", JSON.stringify(wDataConnection));
  }

  return (
    <Grid container className={classes.root}>      
      <Grid item xs={12}
          sm={12}
          md={6}>
        <Paper className={classes.paper} elevation={0} style={{paddingRight: "2px"}}>
        <ConnectionComponent
              title={"Connection 1"}
              dataConnection={dataConnection}
              onHandleChange={handleChange}
              onClearDataConnection={clearDataConnect}
            />
        </Paper>
      </Grid>
      <Grid item xs={12}
          sm={12}
          md={6}>
        <Paper className={classes.paper} elevation={0}  style={{paddingLeft: "2px"}}>
        <ConnectionComponent
              title={"Connection 2"}
              dataConnection={dataConnection}
              onHandleChange={handleChange}
              onClearDataConnection={clearDataConnect}
            />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <CompareOptionsComponent />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper} style={{marginTop:"10px"}}>
        <TextArea
            height={500}
            /* value={this.state.valueForEditableTestArea}
            valueChangeEvent={this.state.eventValue}
            onValueChanged={this.onTextAreaValueChanged} */
          />
        </Paper>
      </Grid>
     
      </Grid>
  );
}

export { CompareScriptComponent };
