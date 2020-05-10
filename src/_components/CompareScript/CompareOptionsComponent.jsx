import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { RadioGroup } from "devextreme-react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Autocomplete } from 'devextreme-react/autocomplete';

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



function CompareOptionsComponent(props) {
  const classes = useStyles();
  const dataBaseList = useSelector((state) => state.dataBaseList);
  const dataCompare = useSelector((state) => state.dataCompare);
 
  
  function renderDatabasesFirst() {
    return dataBaseList.databasesFirstConnection.map((dt, i) => {
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

  function renderDatabasesSecond() {
    return dataBaseList.databasesSecondConnection.map((dt, i) => {
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

  function renderObjectsFirstConn(){
    return dataCompare.listObjectsCompareFirstConn.map((dt, i) => {
      return (
        <MenuItem
          label="Select Object"
          value={dt.NameFormat}
          key={i}
          name={dt.NameFormat}
        >
          {dt.NameFormat}
        </MenuItem>
      );
    });
  }

  function renderObjectsSecondConn(){
    return dataCompare.listObjectsCompareSecondConn.map((dt, i) => {
      return (
        <MenuItem
          label="Select Object"
          value={dt.NameFormat}
          key={i}
          name={dt.NameFormat}
        >
          {dt.NameFormat}
        </MenuItem>
      );
    });
  }

  /* function changeObjectForCompare(e){
    setOptionCompareSelect(e.value);
  } */
  
  return (
    <div style={{ width: "100%", padding: "15px" }}>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
          <RadioGroup
            items={props.optionsCompare}
            layout="horizontal"
            defaultValue={props.optionsCompare[0]}
            onValueChanged={props.onChangeObjectForCompare}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-3">
          <FormControl
            className={classes.formControl}
            fullWidth
            style={{ marginTop: "16px" }}
          >
            <InputLabel id="demo-simple-select-error-label">
              Select Database
            </InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"
              value={props.dataConnectionFirst.DataBase}
              onChange={props.onChangeDatabaseFirst}
              inputProps={{
                name: "DataBase",
                id: "age-native-simple",
                margin: "normal",
              }}
            >
              <MenuItem value="">
                <em>Select...</em>
              </MenuItem>
              {dataBaseList.databasesFirstConnection && renderDatabasesFirst()}
            </Select>
          </FormControl>
        </div>
        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-3">
          <FormControl
            className={classes.formControl}
            fullWidth
            style={{ marginTop: "30px" }}
          >
            <Autocomplete
                dataSource={dataCompare.listObjectsCompareFirstConn}
                value={props.objectCompareSelectFirst}
                onValueChanged={props.onChangeobjectCompareFirst}
                placeholder="Type object name"
                valueExpr="NameFormat"
              />                      
          </FormControl>
        </div>
        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-3">
          <FormControl
            className={classes.formControl}
            fullWidth
            style={{ marginTop: "16px" }}
          >
            <InputLabel id="demo-simple-select-error-label">
              Select Database
            </InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"
              value={props.dataConnectionSecond.DataBase}
              onChange={props.onChangeDatabaseSecond}
              inputProps={{
                name: "DataBase",
                id: "age-native-simple",
                margin: "normal",
              }}
            >
              <MenuItem value="">
                <em>Select...</em>
              </MenuItem>
              {dataBaseList.databasesSecondConnection && renderDatabasesSecond()}
            </Select>
          </FormControl>
        </div>
        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-3">
          <FormControl
            className={classes.formControl}
            fullWidth
            style={{ marginTop: "30px" }}
          >
             <Autocomplete
                dataSource={dataCompare.listObjectsCompareSecondConn}
                value={props.objectCompareSelectSecond}
                onValueChanged={props.onChangeobjectCompareSecond}
                placeholder="Type object name"
                valueExpr="NameFormat"
              />
           {/*  <InputLabel id="demo-simple-select-error-label">
              Select Option
            </InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"
              value={dataConnection.DataBase}
                    onChange={handleChange}
              inputProps={{
                name: "NameFormat",
                id: "age-native-simple",
                margin: "normal",
              }}
            >
              <MenuItem value="">
                <em>Select...</em>
              </MenuItem>
              {dataCompare.listObjectsCompareSecondConn && renderObjectsSecondConn()}
            </Select> */}
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
            onClick={props.onCompare}
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
