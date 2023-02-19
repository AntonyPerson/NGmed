/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import NativeSelect from "@mui/material/NativeSelect";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Dropzone from "react-dropzone-uploader";
import Popup from "reactjs-popup";
// import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Upload } from "antd-upload";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link, Navigate } from "react-router-dom";
// import { multipleFilesUpload } from "../../data/api";

import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useDropzone } from "react-dropzone";
import { Icons, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

// Material Dashboard 2 React Components
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Select,
  Switch,
} from "@mui/material";
import MDAlert from "components/MDAlert";
import userFielsTable from "layouts/tables/userFielsTable";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { DropzoneArea } from "react-mui-dropzone";

// user and auth import
import { authenticate, isAuthenticated, signin } from "auth/index";
import * as xlsx from "xlsx/xlsx.mjs";
const { user } = isAuthenticated();
// console.log("Hozla Print Request Form");
// console.log(user);


export default function EditCountSoliders(props) {
  const [dataDB, setDataDB] = useState({
  _id: "",
  name: "",
  ploga: "",
  hativa: "",
  countSoliders: "",
  countWatches: "",
  countWatchesUsed: "",

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
    requestID: "",
  });

  useEffect(() => {
      axios
      .get(`http://localhost:5000/NGmedDB/treeMangment/mahlaka/${props.mahlakaID}`)
        .then((response) => {
          console.log("==================================");
          console.log(response.data);
          console.log("==================================");
          setDataDB({
            ...dataDB,
            fileName: response.data.fileName,
            _id: response.data._id,
            name: response.data.name,
            ploga: response.data.ploga,
            hativa: response.data.hativa,
            countSoliders: response.data.countSoliders,
            countWatches: response.data.countWatches,
            countWatchesUsed: response.data.countWatchesUsed,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);
  
  const handleCloseSuccsecModal = () => {
      setDataDB({
        ...dataDB,
        loading: false,
        error: false,
        successmsg: false,
        NavigateToReferrer: false,
      });
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
        <DialogContent>
            <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
              הקובץ עודכן במערכת בהצלחה
           </MDTypography>
          
        </DialogContent>
        <DialogContent>
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              הקובץ {dataDB.fileName} עודכן
            </MDTypography>
          
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
          <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
            שגיאה בעדכון פרטי הקובץ
          </MDTypography>

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
            <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
              עדכון הקובץ יקח מספר רגעים...
            </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  function handleChange(evt) {
    const { value } = evt.target;
    setDataDB({ ...dataDB, [evt.target.name]: value });
  }

  const onSubmit = (event) => {
    event.preventDefault();

    setDataDB({
      ...dataDB,
      loading: true,
      successmsg: false,
      error: false,
      NavigateToReferrer: false,
    });

    const requestDataToUpdate = {
      _id: dataDB._id,
      name: dataDB.name,
      ploga: dataDB.ploga,
      hativa: dataDB.hativa,
      countSoliders: dataDB.countSoliders ,
      countWatches: dataDB.countWatches,
      countWatchesUsed: dataDB.countWatchesUsed,
    };
    if(props.task === "updateCountSoliders"){
      axios
      .post(
        `http://localhost:5000/NGmedDB/treeMangment/mahlaka/updateCountSoliders/${props.mahlakaID}`,
        requestDataToUpdate
      )
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

    }else{
      axios
      .post(
        `http://localhost:5000/NGmedDB/treeMangment/mahlaka/updateCountWatches/${props.mahlakaID}`,
        requestDataToUpdate
      )
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

  const editCountSoliders = () => (
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
              
           {props.task === "updateCountSoliders" ? (
             <MDTypography variant="h4" fontWeight="large" color="white" mt={1}>
                עדכון כמות מספר החיילים ב{dataDB.name}
             </MDTypography>
           ) : (
              <MDTypography variant="h4" fontWeight="large" color="white" mt={1}>
                   עדכון מספר השעונים ב{dataDB.name}
              </MDTypography>
          )}
                  
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form" onSubmit={onSubmit}>
                <FormGroup row>
                {props.task === "updateCountSoliders" ? (
                  <FormGroup>
                  <Label for="countSoliders">מספר החיילים במחלקה</Label>
                  <Input
                    required
                    checked
                    name="countSoliders"
                    type="number"
                    min="1"
                    value={dataDB.countSoliders}
                    onChange={handleChange}
                  />
                </FormGroup>
           ) : (
            <FormGroup>
            <Label for="countWatches">מספר השעונים במחלקה</Label>
            <Input
              required
              checked
              name="countWatches"
              type="number"
              min="1"
              value={dataDB.countWatches}
              onChange={handleChange}
            />
          </FormGroup>
          )}
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
                     עדכן
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
      {/* {NavigateUser()} */}

      {editCountSoliders()}
    </>
  );
}
