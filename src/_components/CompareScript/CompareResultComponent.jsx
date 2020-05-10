import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ConnectionComponent } from "../ExecuteScripts";
import { CompareOptionsComponent } from "./CompareOptionsComponent";
import { CheckBox, SelectBox, TextArea } from "devextreme-react";
import { ReactGhLikeDiff } from "react-gh-like-diff";

import { makeStyles } from "@material-ui/core/styles";

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

function CompareResultComponent(props) {
  return (
    <div style={{ padding: "10px" }}>
      <ReactGhLikeDiff
        options={{
          originalFileName: props.dataCompare.firstTextName,
          updatedFileName: props.dataCompare.secondTextName,
        }}
        past={props.dataCompare.firstText}
        current={props.dataCompare.secondText}
      />
    </div>
  );
}

export { CompareResultComponent };
