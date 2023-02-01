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
import axios from "axios";
import MDButton from "components/MDButton";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// user and auth import
import { Dialog, DialogContent } from "@mui/material";
import { authenticate, isAuthenticated, signin } from "auth/index";
import MDBadge from "components/MDBadge";
import ExcelToJasonFileUploader from "layouts/Forms/ExcelToJasonFileUploader";

const { user } = isAuthenticated();

export default function data() {
  const [isError, setIsError] = useState(false);
  const [requestDB, setRequestDB] = useState([]);
  const [toUpdateFile, setToUpdateFile] = useState(false);
  const [toUpdateFileID, setToUpdateFileID] = useState("");

  useEffect(() => {
    console.log(user.personalnumber);
    axios
      .get(`http://localhost:5000/NGmedDB/ExcelData/`)
      .then((response) => {
        console.log(response.data);
        setRequestDB(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
    // axios
    //   .get(`http://localhost:5000/NGmedDB/DeletedInfo/`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setRequestDB(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setIsError(true);
    //   });
  }, []);

  const dbRows = requestDB.map((excelFile, index) => ({
    // fileID: excelFile._id,
    fileName: excelFile.fileName,
    // isPublic: (
    //   <>
    //     <MDBadge
    //       badgeContent={excelFile.publicFile ? "ציבורי" : "פרטי"}
    //       variant="contained"
    //       container
    //     />
    //   </>
    // ),
    mangmentTree: (
      <>
        <MDBadge
          badgeContent={excelFile.gdodName}
          // size="sm"
          variant="contained"
          container
          color="success"
        />
        <Icon sx={{ pt: 0.7 }} fontSize="medium">
          keyboard_backspace
        </Icon>
        <MDBadge
          badgeContent={excelFile.plogaName}
          // size="sm"
          color="secondary"
          variant="contained"
          container
        />
        <Icon sx={{ pt: 0.7 }} fontSize="medium">
          keyboard_backspace
        </Icon>
        <MDBadge
          badgeContent={excelFile.mahlakaName}
          // size="sm"
          color="mekatnar"
          variant="contained"
          container
        />
      </>
    ),

    personalNumberUploader: excelFile.personalNumberUploader,
    personalNumberDeleter: excelFile.personalNumberDeleter,
    deletedDate: excelFile.deletedDate,
  }));
  console.log(`isError ${isError}`);
  return {
    //* the tables headers
    columns: [
      { Header: "שם הקובץ", accessor: "fileName", align: "left" },
      // { Header: "פרטי / ציבורי", accessor: "isPublic", align: "left" },
      { Header: "שייכות", accessor: "mangmentTree", align: "center" },
      { Header: "מספר אישי של מעלה הקובץ", accessor: "personalNumberUploader", align: "center" },
      { Header: "מספר אישי של מוחק הקובץ", accessor: "personalNumberDeleter", align: "center" },
      { Header: "תאריך מחיקה", accessor: "deletedDate", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,

    fileUpdate: toUpdateFile,
    setFileUpdate: setToUpdateFile,
    fileId: toUpdateFileID,
  };
}
