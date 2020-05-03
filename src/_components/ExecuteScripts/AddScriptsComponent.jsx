import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { alertActions, scriptActions } from "../../_actions";

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
  const scriptsList = useSelector((state) => state.scriptsList);
  const dispatch = useDispatch();

  function handleCapture({ target }) {
    var wFiles = target.files;
    var count = scriptsList.items.length;
    for (var i = 0; i < wFiles.length; i++) {
      count += 1;
      (function (file) {
        var name = file.name;
        var reader = new FileReader();
        reader.onload = function (e) {
          console.log(e);
          var text = e.target.result;
          const wScript = {
            Id: scriptsList.items.length + 1,
            Name: name,
            Text: text,
            ErrorMessage: "",
          };
          dispatch(scriptActions.Add(wScript));
        };
        reader.readAsText(file, "UTF-8");
      })(wFiles[i]);
    }
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
        </div>
      </div>
    </div>
  );
}

export { AddScriptsComponent };
