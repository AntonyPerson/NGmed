/* eslint-disable import/no-unresolved */
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
    // axios
    //   .get(
    //     `http://localhost:5000/NGmedDB/ExcelData/getExcelsInfoByPersonalnumber/${user.personalnumber}`
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     setRequestDB(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setIsError(true);
    //   });
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
  }, []);

  const dbRows = requestDB.map((excelFile, index) => ({
    // project: <Project image={LogoAsana} name="Asana" />,
    personalNumber: excelFile.personalnumber,

    // fileID: excelFile._id,
    fileName: excelFile.fileName,
    dateUpdated: excelFile.updatedAt.split("T")[0],
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
    countWatchesUsed: excelFile.countWatchesUsed,
    // fileDateRange: `${excelFile.fileJason[1].calendarDate} ==> ${
    //   excelFile.fileJason[excelFile.fileJason.length - 1].calendarDate
    // }`,
    fileDateRange: (
      <>
        <MDBadge
          badgeContent={`${excelFile.startDate.split("-").reverse().join("/")} - ${excelFile.endDate
            .split("-")
            .reverse()
            .join("/")}`}
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
    editFile: (
      <MDButton
        variant="gradient"
        color="mekatnar"
        onClick={async () => {
          await setToUpdateFileID(excelFile._id);
          await setToUpdateFile(true);
        }}
        circular="true"
        iconOnly="true"
        size="medium"
      >
        <Icon>edit</Icon>
      </MDButton>
    ),
    deleteFile: (
      <MDButton
        variant="gradient"
        color="mekatnar"
        onClick={() => {
          axios
            .delete(`http://localhost:5000/NGmedDB/ExcelData/${excelFile._id}`)
            .then((response) => {
              axios
                .post(`http://localhost:5000/NGmedDB/DeletedInfo/add`, {
                  fileName: excelFile.fileName,

                  pikod: excelFile.pikod,
                  ogda: excelFile.ogda,
                  hativa: excelFile.hativa,
                  gdod: excelFile.gdod,
                  ploga: excelFile.ploga,
                  mahlaka: excelFile.mahlaka,

                  pikodName: excelFile.pikodName,
                  ogdaName: excelFile.ogdaName,
                  hativaName: excelFile.hativaName,
                  gdodName: excelFile.gdodName,
                  plogaName: excelFile.plogaName,
                  mahlakaName: excelFile.mahlakaName,

                  personalnumberUploader: excelFile.personalnumber,
                  personalnumberDeleter: user.personalnumber,
                })
                .then((response2) => {
                  // eslint-disable-next-line no-self-assign
                  window.location.href = window.location.href;
                })
                .catch((error) => {
                  console.log(error);
                });
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
      { Header: "מ.א של מעלה הקובץ", accessor: "personalNumber", align: "left" },
      { Header: "עודכן לאחרונה", accessor: "dateUpdated", align: "left" },
      // { Header: "פרטי / ציבורי", accessor: "isPublic", align: "left" },
      { Header: "שייכות", accessor: "mangmentTree", align: "center" },
      { Header: "מספר שעונים שנפרקו", accessor: "countWatchesUsed", align: "center" },
      { Header: "טווח תאריכים", accessor: "fileDateRange", align: "center" },
      { Header: "נתוני הקובץ", accessor: "graphs", align: "center" },
      { Header: "עידכון פרטים", accessor: "editFile", align: "center" },
      { Header: "מחיקה", accessor: "deleteFile", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,

    fileUpdate: toUpdateFile,
    setFileUpdate: setToUpdateFile,
    fileId: toUpdateFileID,
  };
}
