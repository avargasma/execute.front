import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { makeStyles } from "@material-ui/core/styles";

import { ProgressBar } from "devextreme-react/progress-bar";
import { custom } from "devextreme/ui/dialog";
import { loaderActions, scriptActions } from "../../_actions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  rootImage: {
    maxWidth: 345,
  },
  paper: {
    margin: theme.spacing(1, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(1, 0, 1)
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

function AddScriptsComponent() {
  const classes = useStyles();
  const mDataLoader = useSelector((state) => state.dataLoader);
  const scriptsList = useSelector((state) => state.scriptsList);
  const dispatch = useDispatch();

  function handleCapture({ target }) {
    var wFiles = target.files;
    var i = -1;

    dispatch(
      loaderActions.SetLoaderLoadScripts({ maxValue: 100, processValue: 100 })
    );

    function next() {
      i++;

      var wDataLoaderLoadScripts = {
        maxValue: wFiles.length,
        processValue: wFiles.length - i,
      };

      dispatch(loaderActions.SetLoaderLoadScripts(wDataLoaderLoadScripts));
      if (i < wFiles.length) {
        var file = wFiles[i];
        var name = file.name;
        var reader = new FileReader();
        reader.onload = function (e) {
          var text = e.target.result;
          const wScript = {
            Id: i + 1,
            Name: name,
            Text: text,
            ErrorMessage: "",
          };
          dispatch(scriptActions.Add(wScript));
          next();
        };
        reader.readAsText(file, "UTF-8");
      } else {
        dispatch(loaderActions.SetLoaderLoadScripts(null));
      }
    }
    next();
  }

  function statusFormat(value) {
    return `Loading: ${Math.round(value * 100)}%`;
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

  function clearListScripts(){
    if(!scriptsList.items.length)return;
    handleMessageConfirm("¿Are you sure you want to clear script list?")
    .show()
    .then((dialogResult) => {
      if (dialogResult) {
          dispatch(scriptActions.Init());
      }
    });
  }

  return (
    <div className={classes.paper}>
      <div className="row">
      <div className="col-md-6 col-xs-12 col-lg-6">

        </div>
        <div className="col-md-3 col-xs-12 col-lg-3">
          <Button
            type="button"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#032556", color: "white" }}
            component="label"
            className={classes.submit}
            startIcon={<LibraryAdd />}
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
          {mDataLoader.dataLoaderScripts && (
            <ProgressBar
              id="progress-bar-status"
              width="100%"
              min={0}
              max={mDataLoader.dataLoaderScripts.maxValue}
              statusFormat={statusFormat}
              value={
                mDataLoader.dataLoaderScripts.maxValue -
                mDataLoader.dataLoaderScripts.processValue
              }
            />
          )}
        </div>
        <div className="col-md-3 col-xs-12 col-lg-3">
        
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={clearListScripts}
            startIcon={<DeleteSweepIcon />}
            className={classes.submit}
          >
            Clear Files
          </Button>
        </div>
      </div>
    </div>
  );
}

export { AddScriptsComponent };
