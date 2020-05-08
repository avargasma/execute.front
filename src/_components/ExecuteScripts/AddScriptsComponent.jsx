import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import { ProgressBar } from 'devextreme-react/progress-bar';

import { makeStyles } from "@material-ui/core/styles";
import { loaderActions, scriptActions } from "../../_actions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  rootImage: {
    maxWidth: 345,
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
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#032556"
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
  const dispatch = useDispatch();
  
  function handleCapture({ target }) {
    var wFiles = target.files;
    var i = -1;
    
    dispatch(loaderActions.SetLoaderLoadScripts({maxValue:100,processValue:100}));


    function next() {
      
        i++;
        
        var wDataLoaderLoadScripts ={
          maxValue:wFiles.length,
          processValue:(wFiles.length-i)
        }
        
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
    return `Loading: ${ Math.round(value * 100) }%`;
  }
  
  return (
    <div className={classes.paper}>
      <div className="row">
        <div className="col-md-6 col-xs-12 col-lg-6"></div>
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
          {mDataLoader.dataLoaderScripts &&
          <ProgressBar
            id="progress-bar-status"
            width="100%"
            min={0}
            max={mDataLoader.dataLoaderScripts.maxValue}
            statusFormat={statusFormat}
            value={mDataLoader.dataLoaderScripts.maxValue - mDataLoader.dataLoaderScripts.processValue}
          />}
        </div>
      </div>
    </div>
  );
}

export { AddScriptsComponent };
