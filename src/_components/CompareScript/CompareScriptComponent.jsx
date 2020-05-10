import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ConnectionComponent } from "../ExecuteScripts";
import { CompareOptionsComponent } from "./CompareOptionsComponent";
import { CheckBox, SelectBox, TextArea } from "devextreme-react";
import { dataBaseActions, dataCompareActions } from "../../_actions";
import { makeStyles } from "@material-ui/core/styles";
import { CompareResultComponent } from "./CompareResultComponent";
import { custom } from "devextreme/ui/dialog";
import { databaseService } from "../../_services";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
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
  const dispatch = useDispatch();

  const wKeyStorageFirstConnection = "DATA_CONN_COMPARE_FIRST";
  const wKeyStorageSecondConnection = "DATA_CONN_COMPARE_SECOND";
  const modelDataConnection = {
    Server: "",
    User: "",
    Password: "",
    DataBase: "",
  };
  const [dataConnectionFirst, setDataConnectionFirst] = useState(
    JSON.parse(sessionStorage.getItem(wKeyStorageFirstConnection)) ||
      modelDataConnection
  );
  const [dataConnectionSecond, setDataConnectionSecond] = useState(
    JSON.parse(sessionStorage.getItem(wKeyStorageSecondConnection)) ||
      modelDataConnection
  );
  const [dataCompare, setDataCompare] = useState(null);
  const optionsCompare = ["Store Procedure"/* , "Table", "View" */];
  const [optionCompareSelect, setOptionCompareSelect] = useState(optionsCompare[0]);
  const [objectCompareSelectFirst, setObjectCompareSelectFirst] = useState("");
  const [objectCompareSelectSecond, setObjectCompareSelectSecond] = useState("");

  function changeObjectForCompare(e) {
    setOptionCompareSelect(e.value);
  }

  function onChangeobjectCompareFirst(e){
    setObjectCompareSelectFirst(e.value);
  }

  function onChangeobjectCompareSecond(e){
    setObjectCompareSelectSecond(e.value);
  }

  function onChangeDatabaseFirst(e){
    const { name, value } = e.target;
    var dataConn = {
      Server: dataConnectionFirst.Server,
      User: dataConnectionFirst.User,
      Password: dataConnectionFirst.Password,
      DataBase: value,
    }
    
    setDataConnectionFirst(dataConn); 
    sessionStorage.setItem(wKeyStorageFirstConnection, JSON.stringify(dataConn));
    
    switch (optionCompareSelect) {
      case "Store Procedure":
        loadStoreProceduresFirstConn(dataConn);
        break;
      case "Table":
        loadTablesFirstConn(dataConn);
        break;
      case "View":
        loadViewsFirstConn(dataConn);
        break;
      default:
        break;
    }
  }

  function onChangeDatabaseSecond(e){
    const { name, value } = e.target;
    var dataConn = {
      Server: dataConnectionSecond.Server,
      User: dataConnectionSecond.User,
      Password: dataConnectionSecond.Password,
      DataBase: value,
    }
    
    setDataConnectionSecond(dataConn);
    sessionStorage.setItem(wKeyStorageSecondConnection, JSON.stringify(dataConn));
    
    switch (optionCompareSelect) {
      case "Store Procedure":
        loadStoreProceduresSecondConn(dataConn);
        break;
      case "Table":
        loadTablesSecondConn(dataConn);
        break;
      case "View":
        loadViewsSecondConn(dataConn);
        break;
      default:
        break;
    }
  }

  function loadStoreProceduresFirstConn(dataConn) {
    databaseService.storeprocedurespost(dataConn).then(
      (res) => {
        dispatch(dataCompareActions.setObjectCompareFisrtConn(res.result));
      },
      (error) => {
        console.log(error);
        handleMessage("Connection error").show();
      }
    );
  }

  function loadTablesFirstConn(dataConn) {
    databaseService.tablespost(dataConn).then(
      (res) => {
        dispatch(dataCompareActions.setObjectCompareFisrtConn(res.result));
      },
      (error) => {
        console.log(error);
        handleMessage("Connection error").show();
      }
    );
  }

  function loadViewsFirstConn(dataConn) {
    databaseService.viewspost(dataConn).then(
      (res) => {
        dispatch(dataCompareActions.setObjectCompareFisrtConn(res.result));
      },
      (error) => {
        console.log(error);
        handleMessage("Connection error").show();
      }
    );
  }

  function loadStoreProceduresSecondConn(dataConn) {
    databaseService.storeprocedurespost(dataConn).then(
      (res) => {
        dispatch(dataCompareActions.setObjectCompareSecondConn(res.result));
      },
      (error) => {
        console.log(error);
        handleMessage("Connection error").show();
      }
    );
  }

  function loadTablesSecondConn(dataConn) {
    databaseService.tablespost(dataConn).then(
      (res) => {
        dispatch(dataCompareActions.setObjectCompareSecondConn(res.result));
      },
      (error) => {
        console.log(error);
        handleMessage("Connection error").show();
      }
    );
  }

  function loadViewsSecondConn(dataConn) {
    databaseService.viewspost(dataConn).then(
      (res) => {
        dispatch(dataCompareActions.setObjectCompareSecondConn(res.result));
      },
      (error) => {
        console.log(error);
        handleMessage("Connection error").show();
      }
    );
  }

  function onChangeConnectionSecond(e) {
    const { name, value } = e.target;
    setDataConnectionSecond((dataConnectionSecond) => ({
      ...dataConnectionSecond,
      [name]: value,
    }));
  }

  function onChangeConnectionFirst(e) {
    const { name, value } = e.target;
    setDataConnectionFirst((dataConnectionFirst) => ({
      ...dataConnectionFirst,
      [name]: value,
    }));
  }

  function onLoadDataBasesFirstConn(pDataBases) {
    dispatch(dataBaseActions.loadAllFirstConnection(pDataBases));
  }

  function onLoadDataBasesSecondConn(pDataBases) {
    dispatch(dataBaseActions.loadAllSecondConnection(pDataBases));
  }

  function startCompare() {
    
    let firstText = '';
    let secondText = '';
    let dataConnFirst = {
      Server: dataConnectionFirst.Server,
      User: dataConnectionFirst.User,
      Password: dataConnectionFirst.Password,
      DataBase: dataConnectionFirst.DataBase,
      ObjectName:objectCompareSelectFirst
    }

    let dataConnSecond = {
      Server: dataConnectionSecond.Server,
      User: dataConnectionSecond.User,
      Password: dataConnectionSecond.Password,
      DataBase: dataConnectionSecond.DataBase,
      ObjectName:objectCompareSelectSecond
    }
    

    databaseService.storeproceduretextpost(dataConnFirst).then(
      (res) => {
        if(!res.result[0] || !res.result[0].hasOwnProperty('TextStoreProcedure'))
        {
          handleMessage("Error with text 1").show();
          return;
        }
        firstText = res.result[0].TextStoreProcedure;
        databaseService.storeproceduretextpost(dataConnSecond).then(
          (res) => {
            if(!res.result[0] || !res.result[0].hasOwnProperty('TextStoreProcedure'))
            {
              handleMessage("Error with text 2").show();
              return;
            }
            secondText = res.result[0].TextStoreProcedure;
         
            const wModelDataCompare = {
              firstTextName: objectCompareSelectFirst,
              secondTextName: objectCompareSelectSecond,
              firstText: firstText,
              secondText: secondText,
            };
            setDataCompare(wModelDataCompare);
          },
          (error) => {
            console.log(error);
            handleMessage("Error with text 2").show();
          }
        );
      },
      (error) => {
        console.log(error);
        handleMessage("Error with text 1").show();
      }
    );   
    
  }

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

  function clearDataConnectFirst() {
    setDataConnectionFirst(modelDataConnection);
    sessionStorage.setItem(
      wKeyStorageFirstConnection,
      JSON.stringify(modelDataConnection)
    );
  }

  function clearDataConnectSecond() {
    setDataConnectionSecond(modelDataConnection);
    sessionStorage.setItem(
      wKeyStorageSecondConnection,
      JSON.stringify(modelDataConnection)
    );
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={6}>
        <Paper
          className={classes.paper}
          elevation={0}
          style={{ paddingRight: "2px" }}
        >
          <ConnectionComponent
            title={"Connection 1"}
            dataConnection={dataConnectionFirst}
            onHandleChange={onChangeConnectionFirst}
            onClearDataConnection={clearDataConnectFirst}
            keyStorage={wKeyStorageFirstConnection}
            onLoadDataBases={onLoadDataBasesFirstConn}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Paper
          className={classes.paper}
          elevation={0}
          style={{ paddingLeft: "2px" }}
        >
          <ConnectionComponent
            title={"Connection 2"}
            dataConnection={dataConnectionSecond}
            onHandleChange={onChangeConnectionSecond}
            onClearDataConnection={clearDataConnectSecond}
            keyStorage={wKeyStorageSecondConnection}
            onLoadDataBases={onLoadDataBasesSecondConn}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <CompareOptionsComponent
            onCompare={startCompare}
            onChangeObjectForCompare={changeObjectForCompare}
            onChangeDatabaseFirst={onChangeDatabaseFirst}
            onChangeDatabaseSecond={onChangeDatabaseSecond}
            onChangeobjectCompareFirst={onChangeobjectCompareFirst}
            onChangeobjectCompareSecond={onChangeobjectCompareSecond}
            dataConnectionFirst={dataConnectionFirst}
            dataConnectionSecond={dataConnectionSecond}
            optionsCompare={optionsCompare}
            objectCompareSelectFirst={objectCompareSelectFirst}
            objectCompareSelectSecond={objectCompareSelectSecond}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          id="destination-elem-id"
          className={classes.paper}
          style={{ marginTop: "10px" }}
        >
          {dataCompare && <CompareResultComponent dataCompare={dataCompare} />}
        </Paper>
      </Grid>
    </Grid>
  );
}

export { CompareScriptComponent };
