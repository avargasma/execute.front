import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import config from "config";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { ProgressBar } from "devextreme-react/progress-bar";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  Export,
} from "devextreme-react/data-grid";
import { AddScriptsComponent } from "./AddScriptsComponent";
import { ConnectionComponent } from "./ConnectionComponent";
import { scriptActions, dataBaseActions, loaderActions } from "../../_actions";
import { custom } from "devextreme/ui/dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "30vh",
  },
  button: {
    marginTop: "25px",
    backgroundColor: "#032556",
  },
  paper: {
    margin: theme.spacing(2, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
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
    margin: theme.spacing(1, 0, 1),
  },
  textcontrol: {
    width: "100%",
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
  const scriptsList = useSelector((state) => state.scriptsList);
  const dataBaseList = useSelector((state) => state.dataBaseList);
  const mDataLoader = useSelector((state) => state.dataLoader);
  const modelDataConnection = {
    Server: "",
    User: "",
    Password: "",
    DataBase: "",
  };
  const [dataConnection, setDataConnection] = useState(
    JSON.parse(sessionStorage.getItem("DATA_CONNECTION")) || modelDataConnection
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(scriptActions.Init());
  }, []);

  //region Service
  function executeStart() {
    if (scriptsList.items.length <= 0) {
      handleMessage("You have to load files .sql").show();
      return;
    } else if (!dataConnection.DataBase) {
      handleMessage("You have to select database").show();
      return;
    }

    handleMessageConfirm("¿Are you sure you want to start execute process?")
      .show()
      .then((dialogResult) => {
        if (dialogResult) {
          let element;
          var wScripts = scriptsList.items;
          dispatch(
            loaderActions.SetLoaderExecuteScripts({
              maxValue: 100,
              processValue: 100,
            })
          );
          let promiseChain = Promise.resolve();
          for (let i = 0; i < wScripts.length; i++) {
            element = wScripts[i];
            var wText = element.Text.split("GO");
            for (let index = 0; index < wText.length; index++) {
              const script = wText[index];
              const makeNextPromise = (script, indexScript) => () => {
                return executeScript(script).then(
                  (res) => {
                    if (res.result.hasOwnProperty("originalError")) {
                      wScripts[indexScript].ErrorMessage =
                        wScripts[indexScript].ErrorMessage.replace(
                          "Execute ok",
                          ""
                        ) +
                        "\n" +
                        res.result.originalError.info.message;
                    } else {
                      if (wScripts[indexScript].ErrorMessage == "")
                        wScripts[indexScript].ErrorMessage = res.result;
                    }
                    dispatch(scriptActions.Update(wScripts[indexScript]));
                    console.log(indexScript);
                    var wDataLoaderLoadScripts = {
                      maxValue: wScripts.length,
                      processValue: wScripts.length - (indexScript + 1),
                    };
                    dispatch(
                      loaderActions.SetLoaderExecuteScripts(
                        wDataLoaderLoadScripts
                      )
                    );
                    if (wDataLoaderLoadScripts.processValue == 0) {
                      dispatch(loaderActions.SetLoaderExecuteScripts(null));
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              };
              promiseChain = promiseChain.then(makeNextPromise(script, i));
            }
          }
        }
      });
  }

  function executeScript(pScript) {
    var data = {
      server: dataConnection.Server,
      user: dataConnection.User,
      password: dataConnection.Password,
      database: dataConnection.DataBase,
      script: pScript,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return fetch(`${config.apiUrl}/executemain`, requestOptions).then(
      handleResponse
    );
  }

  function handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }

  function handleMessageConfirm(message, title) {
    let wDialog = custom({
      title: title ? title : "System",
      messageHtml: message,
      buttons: [
        {
          text: "Confirm",
          onClick: (e) => {
            return true;
          },
        },
        {
          text: "Cancel",
          onClick: (e) => {
            return false;
          },
        },
      ],
    });
    return wDialog;
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


  //endregion Service

  function handleChange(e) {
    const { name, value } = e.target;
    setDataConnection((dataConnection) => ({
      ...dataConnection,
      [name]: value,
    }));
  }

  function renderOptions() {
    return dataBaseList.items.map((dt, i) => {
      return (
        <MenuItem
          label="Select DataBase"
          value={dt.name}
          key={i}
          name={dt.name}
        >
          {dt.name}
        </MenuItem>
      );
    });
  }

  function onExporting(e) {
    if (scriptsList.items.length <= 0) e.cancel = true;
  }

  function statusFormat(value) {
    return `Loading: ${Math.round(value * 100)}%`;
  }

  return (
    <div className="col-lg-12  h-100">
      <Grid container component="main" className={classes.root}>
       
        <ConnectionComponent dataConnection={dataConnection} onHandleChange={handleChange} onClearDataConnection={clearDataConnect}/>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">              
              Scripts List
            </Typography>
            <AddScriptsComponent />

            {scriptsList.items && (
              <DataGrid
                id="gridContainer"
                dataSource={scriptsList.items}
                showColumnLines={true}
                rowAlternationEnabled={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                onExporting={onExporting}
              >
                showBorders={true}>
                <GroupPanel visible={false} />
                <Grouping autoExpandAll={false} />
                <Column
                  dataField="Id"
                  caption="Sec"
                  width="30px"
                  visible={false}
                />
                <Column dataField="Name" />
                <Column dataField="Text" width="30%" />
                <Column dataField="ErrorMessage" width="200px" />
                <Export enabled={true} />
              </DataGrid>
            )}
            <br />

            {mDataLoader.dataLoadExecuteScripts && (
              <ProgressBar
                id="progress-bar-status"
                width="100%"
                min={0}
                max={mDataLoader.dataLoadExecuteScripts.maxValue}
                statusFormat={statusFormat}
                value={
                  mDataLoader.dataLoadExecuteScripts.maxValue -
                  mDataLoader.dataLoadExecuteScripts.processValue
                }
              />
            )}
            <br />
            <div className="row">
              <div className="col-md-6 col-xs-12 col-lg-6"></div>
              <div className="col-md-3 col-xs-12 col-lg-3">
                <FormControl
                  className={classes.formControl}
                  fullWidth
                  style={{ marginTop: "16px" }}
                >
                  <InputLabel id="demo-simple-select-error-label">
                    Select DataBase
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-error-label"
                    id="demo-simple-select-error"
                    value={dataConnection.DataBase}
                    onChange={handleChange}
                    inputProps={{
                      name: "DataBase",
                      id: "age-native-simple",
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
                  className={classes.button}
                  style={{ backgroundColor: "#032556", color: "white" }}
                  onClick={executeStart}
                  endIcon={<DoubleArrowIcon />}
                >
                  Execute
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      
      
      </Grid>

    </div>
  );
}

export { ListScriptsComponent };
