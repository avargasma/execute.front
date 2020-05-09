import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { RadioGroup } from 'devextreme-react';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Diff  from "text-diff";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "30vh",
  },
  paper: {
    margin: theme.spacing(1, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    marginTop: "25px",
    backgroundColor: "#032556",
  },
}));

const priorities = ['Store Procedure', 'Table', 'View'];

function CompareOptionsComponent() {
  const classes = useStyles();

  function compare(){
    
    var diff = new Diff();
    var textDiff = diff.main('text1', 'text2');
    console.log(diff.prettyHtml(textDiff)); 
  }

  return (
    <div style={{ width: "100%", padding: "15px" }}>
      <div className="row">
      <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
          <RadioGroup
            items={priorities}
            defaultValue={priorities[0]}
            layout="horizontal"
          />
       </div>
       </div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6">
          <FormControl
            className={classes.formControl}
            fullWidth
            style={{ marginTop: "16px" }}
          >
            <InputLabel id="demo-simple-select-error-label">
              Select Option
            </InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"
              /* value={dataConnection.DataBase}
                    onChange={handleChange} */
              inputProps={{
                name: "DataBase",
                id: "age-native-simple",
                margin: "normal",
              }}
            >
              <MenuItem value="">
                <em>Select...</em>
              </MenuItem>
              {/* {dataBaseList.items && renderOptions()} */}
            </Select>
          </FormControl>
        </div>
        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6">
          <FormControl
            className={classes.formControl}
            fullWidth
            style={{ marginTop: "16px" }}
          >
            <InputLabel id="demo-simple-select-error-label">
              Select Option
            </InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"
              /* value={dataConnection.DataBase}
                    onChange={handleChange} */
              inputProps={{
                name: "DataBase",
                id: "age-native-simple",
                margin: "normal",
              }}
            >
              <MenuItem value="">
                <em>Select...</em>
              </MenuItem>
              {/* {dataBaseList.items && renderOptions()} */}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 col-md-4 col-xs-4 col-lg-4"></div>
        <div className="col-sm-4 col-md-4 col-xs-4 col-lg-4">
          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.button}
            style={{ backgroundColor: "#032556", color: "white" }}
            onClick={compare}
            /* endIcon={<DoubleArrowIcon />} */
          >
            Compare
          </Button>
        </div>
        <div className="col-sm-4 col-md-4 col-xs-4 col-lg-4"></div>
      </div>
    </div>
  );
}

export { CompareOptionsComponent };
