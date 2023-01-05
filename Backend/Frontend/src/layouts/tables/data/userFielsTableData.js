/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";

// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";
import MDBadge from "components/MDBadge";

const { user } = isAuthenticated();

export default function data() {
  const [isError, setIsError] = useState(false);
  const [requestDB, setRequestDB] = useState([]);
  useEffect(() => {
    console.log(user.personalnumber);
    axios
      .get(`http://localhost:5000/ExcelData/uploadedExcelsByPersonalnumber/${user.personalnumber}`)
      .then((response) => {
        console.log(response.data);
        setRequestDB(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  const dbRows = requestDB.map((excelFile, index) => ({
    // project: <Project image={LogoAsana} name="Asana" />,
    // fileID: excelFile._id,
    fileName: excelFile.fileName,
    watchCount: excelFile.watchCount,
    // fileDateRange: `${excelFile.fileJason[1].calendarDate} ==> ${
    //   excelFile.fileJason[excelFile.fileJason.length - 1].calendarDate
    // }`,
    fileDateRange: (
      <>
        <MDBadge
          badgeContent={`${excelFile.fileJason[0].calendarDate} ==> ${
            excelFile.fileJason[excelFile.fileJason.length - 1].calendarDate
          }`}
          variant="contained"
          container
        />
      </>
    ),
    graphs: (
      <Link to={`/Graphs/${excelFile._id}`} key={excelFile._id}>
        <MDButton variant="gradient" color="mekatnar" circular="true" iconOnly="true" size="medium">
          <Icon>equalizer</Icon>
        </MDButton>
      </Link>
    ),
    deleteFile: (
      <MDButton
        variant="gradient"
        color="mekatnar"
        onClick={() => {
          axios
            .delete(`http://localhost:5000/ExcelData/${excelFile._id}`)
            .then((response) => {
              // eslint-disable-next-line no-self-assign
              window.location.href = window.location.href;
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        circular="true"
        iconOnly="true"
        size="medium"
      >
        <Icon>delete</Icon>
      </MDButton>
    ),
  }));
  console.log(`isError ${isError}`);
  return {
    //* the tables headers
    columns: [
      // { Header: "אסמכתא", accessor: "fileID", align: "center" },
      { Header: "שם הקובץ", accessor: "fileName", align: "left" },
      { Header: "מספר שעונים שנפרקו", accessor: "watchCount", align: "center" },
      { Header: "טווח תאריכים", accessor: "fileDateRange", align: "center" },
      { Header: "נתוני הקובץ", accessor: "graphs", align: "center" },
      { Header: "", accessor: "deleteFile", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
  };
}
