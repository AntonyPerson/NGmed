/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// TODO check mult-files
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Popup from "reactjs-popup";
import Dropzone from "react-dropzone-uploader";
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Upload } from "antd-upload";
// import { multipleFilesUpload } from "../../data/api";

import {
  // Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  FormText,
  InputGroupAddon,
  Input,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { ToastContainer, toast, Icons } from "react-toastify";
import { useDropzone } from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";

// Material Dashboard 2 React Components
import MDAlert from "components/MDAlert";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Select,
  Switch,
} from "@mui/material";
import { DropzoneArea } from "react-mui-dropzone";
import { DropzoneAreaBase } from "material-ui-dropzone";
import userFielsTable from "layouts/tables/userFielsTable";

// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";
import * as xlsx from "xlsx/xlsx.mjs";
const { user } = isAuthenticated();
// console.log("Hozla Print Request Form");
// console.log(user);

// props.task ==> update ==> to update a file info.
// props.task ==> create ==> to create a new file.

export default function ExcelToJasonFileUploader(props) {
  const [dataDB, setDataDB] = useState({
    fileName: "",
    fileJason: {},
    watchCount: 1,
    startDate: "",
    endDate: "",
    personalnumber: user.personalnumber,
    publicFile: true,

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
    requestID: "",
  });

  useEffect(() => {
    if (props.task === "update") {
      axios
        .get(`http://localhost:5000/NGmedDB/ExcelData/ExcelInfo/${props.fileID}`)
        .then((response) => {
          console.log("==================================");
          console.log();
          setDataDB({
            ...dataDB,
            fileName: response.data.fileName,
            watchCount: response.data.watchCount,
            publicFile: response.data.publicFile,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleCloseSuccsecModal = () => {
    if (props.task === "create") {
      setDataDB({
        ...dataDB,
        loading: false,
        error: false,
        successmsg: false,
        NavigateToReferrer: true,
      });
    } else {
      setDataDB({
        ...dataDB,
        loading: false,
        error: false,
        successmsg: false,
        NavigateToReferrer: false,
      });
    }
  };
  const handleCloseLoadingModal = () => {
    setDataDB({ ...dataDB, loading: false });
  };
  const handleCloseErrorModal = () => {
    setDataDB({
      ...dataDB,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };
  const NavigateUser = () => {
    if (dataDB.NavigateToReferrer) {
      return <Navigate to={`/Graphs/${dataDB.requestID}`} />;
    }
  };
  const showSuccess = () => (
    <Dialog
      open={dataDB.successmsg}
      onClose={handleCloseSuccsecModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          הבקשה נשלחה למערכת
        </MDTypography>

        <DialogContent>
          {props.task === "create" ? (
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              שם הקובץ שהועלה: {dataDB.fileName}
            </MDTypography>
          ) : (
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              הקובץ {dataDB.fileName} עודכן
            </MDTypography>
          )}
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={dataDB.error}
      onClose={handleCloseErrorModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="error"
        coloredShadow="error"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        {props.task === "create" ? (
          <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
            שגיאה בהעלאת הקובץ
          </MDTypography>
        ) : (
          <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
            שגיאה בעדכון פרטי הקובץ
          </MDTypography>
        )}

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showLoading = () => (
    <Dialog
      open={dataDB.loading}
      onClose={handleCloseLoadingModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        px={5}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          בטעינה
        </MDTypography>

        <DialogContent>
          {props.task === "create" ? (
            <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
              שליחת הקובץ תיקח מספר רגעים...
            </MDTypography>
          ) : (
            <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
              עדכון הקובץ יקח מספר רגעים...
            </MDTypography>
          )}
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  function handleChange(evt) {
    const { value } = evt.target;
    setDataDB({ ...dataDB, [evt.target.name]: value });
  }
  function handleChangeSwitch(evt) {
    // const { checked } = evt.target;
    setDataDB({ ...dataDB, [evt.target.name]: evt.target.checked });
  }

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = xlsx.read(data, { type: "array", cellText: false, cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet, {
          header: 0,
          raw: false,
          dateNF: "yyyy-mm-dd",
        });
        console.log(json);
        setDataDB({
          ...dataDB,
          fileJason: json,
          startDate: json[0].calendarDate,
          endDate: json[json.length - 1].calendarDate,
        });
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setDataDB({
      ...dataDB,
      loading: true,
      successmsg: false,
      error: false,
      NavigateToReferrer: false,
    });

    const requestData = {
      fileName: dataDB.fileName,
      watchCount: dataDB.watchCount,
      fileJason: dataDB.fileJason,
      startDate: dataDB.startDate,
      endDate: dataDB.endDate,
      publicFile: dataDB.publicFile,
      personalnumber: dataDB.personalnumber,
    };
    const requestDataToUpdate = {
      fileName: dataDB.fileName,
      watchCount: dataDB.watchCount,
      publicFile: dataDB.publicFile,
    };
    // console.log(requestData);
    if (props.task === "create") {
      axios
        .post(`http://localhost:5000/NGmedDB/ExcelData/add`, requestData)
        .then((response) => {
          console.log(response);
          setDataDB({
            ...dataDB,
            requestID: response.data,
            loading: false,
            error: false,
            successmsg: true,
            NavigateToReferrer: false,
          });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          setDataDB({
            ...dataDB,
            errortype: error.response,
            loading: false,
            error: true,
            NavigateToReferrer: false,
          });
        });
    } else {
      axios
        .post(`http://localhost:5000/NGmedDB/ExcelData/updateInfo/${props.fileID}`, requestDataToUpdate)
        .then((response) => {
          console.log(response);
          setDataDB({
            ...dataDB,
            loading: false,
            error: false,
            successmsg: true,
          });
          // eslint-disable-next-line no-self-assign
          window.location.href = window.location.href;
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          setDataDB({
            ...dataDB,
            errortype: error.response,
            loading: false,
            error: true,
            NavigateToReferrer: false,
          });
        });
    }
  };
  const excelToJasonFileUploader = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="12" md="12">
          <Card className="shadow border-0">
            <CardBody className="px-lg-8 py-lg-10">
              <MDBox
                variant="gradient"
                bgColor="mekatnar"
                borderRadius="lg"
                coloredShadow="mekatnar"
                mx={7}
                mt={-3}
                p={3}
                mb={4}
                textAlign="center"
              >
                {props.task === "create" ? (
                  <MDTypography variant="h4" fontWeight="large" color="white" mt={1}>
                    העלאת קובץ מידע רפואי
                  </MDTypography>
                ) : (
                  <MDTypography variant="h4" fontWeight="large" color="white" mt={1}>
                    עדכון הקובץ {dataDB.fileName}
                  </MDTypography>
                )}
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form" onSubmit={onSubmit}>
                <FormGroup row>
                  <FormGroup>
                    <Label for="fileName">שם הקובץ</Label>
                    <Input
                      required
                      name="fileName"
                      type="text"
                      value={dataDB.fileName}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </FormGroup>
                {props.task === "create" && (
                  <FormGroup row>
                    <FormGroup>
                      <Input
                        required
                        type="file"
                        name="upload"
                        id="upload"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={readUploadFile}
                        // disabled={fileLimit}
                      />
                    </FormGroup>

                    <FormText style={{ textAlign: "center" }} color="muted">
                      * ניתן לעלות רק קבצי אקסל
                    </FormText>
                  </FormGroup>
                )}

                <FormGroup row>
                  <FormGroup>
                    <Label for="watchCount">מספר שעונים שנפרקו</Label>
                    <Input
                      required
                      checked
                      name="watchCount"
                      type="number"
                      min="1"
                      value={dataDB.watchCount}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="isPublic">ציבורי</Label>
                    <Switch
                      color="mekatnar"
                      name="publicFile"
                      checked={dataDB.publicFile}
                      onChange={handleChangeSwitch}
                    />
                  </FormGroup>
                </FormGroup>
                <FormGroup style={{ textAlign: "center" }}>
                  <MDButton
                    color="mekatnar"
                    size="large"
                    // onClick={clickSubmit}
                    className="btn-new-blue"
                    type="submit"
                    style={{ width: 150 }}
                  >
                    שלח בקשה
                    <Icon fontSize="small">upload</Icon>&nbsp;
                  </MDButton>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <>
      {showError()}
      {showSuccess()}
      {showLoading()}
      {NavigateUser()}

      {excelToJasonFileUploader()}
    </>
  );
}
