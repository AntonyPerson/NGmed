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
} from "@mui/material";
import { DropzoneArea } from "react-mui-dropzone";
import { DropzoneAreaBase } from "material-ui-dropzone";

// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";
import * as xlsx from "xlsx/xlsx.mjs";
const { user } = isAuthenticated();
// console.log("Hozla Print Request Form");
// console.log(user);

export default function ExcelToJasonFileUploader() {
  const [navigateUser, setNavigateUser] = useState(false);

  const NavigateUser = () => {
    if (navigateUser) {
      return <Navigate to="/GraphicSoldierDatas" />;
    }
  };

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
          dateNF: "dd-mm-yyyy",
        });
        console.log(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
        setNavigateUser(true);
    }
  };

  const excelToJasonFileUploader = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="6" md="7">
          <Card className="shadow border-0">
            <CardBody className="px-lg-8 py-lg-10">
              <MDBox
                variant="gradient"
                bgColor="mekatnar"
                borderRadius="lg"
                coloredShadow="mekatnar"
                mx={2}
                mt={-3}
                p={3}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  העלאת קובץ מידע רפואי
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form">
                <FormGroup row>
                  <FormGroup>
                    <Input
                      type="file"
                      name="upload"
                      id="upload"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={readUploadFile}
                      // disabled={fileLimit}
                    />
                  </FormGroup>

                  <FormText color="muted">ניתן להעלאות רק קבצי אקסל</FormText>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {/* //! fot the pop up warning windoes */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {NavigateUser()}

        {excelToJasonFileUploader()}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
