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

    pikod: "",
    ogda: "",
    hativa: "",
    gdod: "",
    ploga: "",
    mahlaka: "",

    pikodName: "",
    ogdaName: "",
    hativaName: "",
    gdodName: "",
    plogaName: "",
    mahlakaName: "",

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
    requestID: "",
  });

  const [gdods, setGdods] = useState([]);
  const [plogot, setPlogot] = useState([]);
  const [mahlakot, setMahlakot] = useState([]);

  // ? Get all Gdods of the same Hativa
  useEffect(() => {
    if (dataDB.hativa !== "") {
      axios
        .post(`http://localhost:5000/NGmedDB/treeMangment/gdod/gdodsByHativaId`, {
          hativa: dataDB.hativa,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.length !== 0 || response.data.length !== undefined) {
            setGdods(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dataDB.hativa]);

  // ? Get all Plogot of the same Gdod
  useEffect(() => {
    if (dataDB.gdod !== "") {
      axios
        .post(`http://localhost:5000/NGmedDB/treeMangment/ploga/plogaByGdodId`, {
          gdod: dataDB.gdod,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.length !== 0 || response.data.length !== undefined) {
            setPlogot(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dataDB.gdod]);

  // ? Get all Mahlakot of the same Ploga
  useEffect(() => {
    if (dataDB.ploga !== "") {
      axios
        .post(`http://localhost:5000/NGmedDB/treeMangment/mahlaka/mahlakaByPlogaId`, {
          ploga: dataDB.ploga,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.length !== 0 || response.data.length !== undefined) {
            setMahlakot(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dataDB.ploga]);

  useEffect(() => {
    if (props.task === "update") {
      axios
        .get(`http://localhost:5000/NGmedDB/ExcelData/ExcelInfo/${props.fileID}`)
        .then((response) => {
          console.log("==================================");
          console.log(response.data);
          console.log("==================================");
          setDataDB({
            ...dataDB,
            fileName: response.data.fileName,
            watchCount: response.data.watchCount,
            publicFile: response.data.publicFile,
            pikod: response.data.pikod,
            ogda: response.data.ogda,
            hativa: response.data.hativa,
            gdod: response.data.gdod,
            ploga: response.data.ploga,
            mahlaka: response.data.mahlaka,
            pikodName: response.data.pikodName,
            ogdaName: response.data.ogdaName,
            hativaName: response.data.hativaName,
            gdodName: response.data.gdodName,
            plogaName: response.data.plogaName,
            mahlakaName: response.data.mahlakaName,
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
        <DialogContent>
          {props.task === "create" ? (
              <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
              הקובץ הועלה למערכת בהצלחה
              </MDTypography>
          ) : (
            <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
              הקובץ עודכן במערכת בהצלחה
           </MDTypography>
          )}
        </DialogContent>
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

  function handleChangeMangmentTreeSelect(evt) {
    const { value, name } = evt.target;
    const op = document.querySelector(`#${name}`);
    let id;

    let nameOfTree = "";
    let valueName = "";

    if (name === "pikod") {
      nameOfTree = "pikodName";
      valueName = "צפון";
    } else if (name === "ogda") {
      nameOfTree = "ogdaName";
      valueName = "אוגדה1";
    } else if (name === "hativa") {
      nameOfTree = "hativaName";
      valueName = "גולני";
    } else if (name === "gdod") {
      nameOfTree = "gdodName";
      if (gdods.length !== 0) {
        id = op.options[op.selectedIndex].id;
        valueName = gdods[id].name;
      }
    } else if (name === "ploga") {
      nameOfTree = "plogaName";
      if (plogot.length !== 0) {
        id = op.options[op.selectedIndex].id;
        valueName = plogot[id].name;
      }
    } else if (name === "mahlaka") {
      nameOfTree = "mahlakaName";
      if (mahlakot.length !== 0) {
        id = op.options[op.selectedIndex].id;
        valueName = mahlakot[id].name;
      }
    }
    setDataDB({ ...dataDB, [name]: value, [nameOfTree]: valueName });
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
      pikod: dataDB.pikod,
      ogda: dataDB.ogda,
      hativa: dataDB.hativa,
      gdod: dataDB.gdod,
      ploga: dataDB.ploga,
      mahlaka: dataDB.mahlaka,
      pikodName: dataDB.pikodName,
      ogdaName: dataDB.ogdaName,
      hativaName: dataDB.hativaName,
      gdodName: dataDB.gdodName,
      plogaName: dataDB.plogaName,
      mahlakaName: dataDB.mahlakaName,
    };
    const requestDataToUpdate = {
      fileName: dataDB.fileName,
      watchCount: dataDB.watchCount,
      publicFile: dataDB.publicFile,
      pikod: dataDB.pikod,
      ogda: dataDB.ogda,
      hativa: dataDB.hativa,
      gdod: dataDB.gdod,
      ploga: dataDB.ploga,
      mahlaka: dataDB.mahlaka,
      pikodName: dataDB.pikodName,
      ogdaName: dataDB.ogdaName,
      hativaName: dataDB.hativaName,
      gdodName: dataDB.gdodName,
      plogaName: dataDB.plogaName,
      mahlakaName: dataDB.mahlakaName,
    };
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
          //! TODO: put here the axios update for the update of the watches used count
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
        .post(
          `http://localhost:5000/NGmedDB/ExcelData/updateInfo/${props.fileID}`,
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
          //! TODO: put here the axios update for the update of the watches used count
          
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

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="pikod">פיקוד</Label>
                      <Input
                        // placeholder={textPlaceHolderInputs[5]}
                        name="pikod"
                        id="pikod"
                        type="select"
                        value={dataDB.pikod}
                        onChange={handleChangeMangmentTreeSelect}
                        required
                      >
                        <option defult value="" disabled>
                          בחר
                        </option>
                        <option value="63bfd8b0128c3fc55027930c">צפון</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="ogda">אוגדה</Label>
                      <Input
                        // placeholder={textPlaceHolderInputs[5]}
                        name="ogda"
                        id="ogda"
                        type="select"
                        value={dataDB.ogda}
                        onChange={handleChangeMangmentTreeSelect}
                        required
                      >
                        <option defult value="" disabled>
                          בחר
                        </option>
                        <option value="63be8b4af3509cdcccdee91b">אוגדה1</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="hativa">חטיבה</Label>
                      <Input
                        // placeholder={textPlaceHolderInputs[5]}
                        name="hativa"
                        type="select"
                        value={dataDB.hativa}
                        onChange={handleChangeMangmentTreeSelect}
                        required
                      >
                        <option defult value="" disabled>
                          בחר
                        </option>
                        <option value="63be8ba2f3509cdcccdee91f">גולני</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="gdod">גדוד</Label>
                      <Input
                        // placeholder={textPlaceHolderInputs[5]}
                        name="gdod"
                        id="gdod"
                        type="select"
                        value={dataDB.gdod}
                        onChange={handleChangeMangmentTreeSelect}
                        required
                        disabled={dataDB.hativa === ""}
                      >
                        <option defult value="" disabled>
                          בחר
                        </option>
                        {gdods.map((gdod, index) => (
                          <option id={index} key={index} value={gdod._id}>
                            {gdod.name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="ploga">פלוגה</Label>
                      <Input
                        // placeholder={textPlaceHolderInputs[5]}
                        id="ploga"
                        name="ploga"
                        type="select"
                        value={dataDB.ploga}
                        onChange={handleChangeMangmentTreeSelect}
                        required
                        disabled={dataDB.gdod === ""}
                      >
                        <option defult value="" disabled>
                          בחר
                        </option>
                        {plogot.map((ploga, index) => (
                          <option key={index} id={index} value={ploga._id}>
                            {ploga.name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="mahlaka">מחלקה</Label>
                      <Input
                        // placeholder={textPlaceHolderInputs[5]}
                        id="mahlaka"
                        name="mahlaka"
                        type="select"
                        value={dataDB.mahlaka}
                        onChange={handleChangeMangmentTreeSelect}
                        required
                        disabled={dataDB.ploga === ""}
                      >
                        <option defult value="" disabled>
                          בחר
                        </option>
                        {mahlakot.map((mahlaka, index) => (
                          <option key={index} id={index} value={mahlaka._id}>
                            {mahlaka.name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
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
                  {props.task === "create" ? (
                     <MDButton
                     color="mekatnar"
                     size="large"
                     // onClick={clickSubmit}
                     className="btn-new-blue"
                     type="submit"
                     style={{ width: 200 }}
                   >
                     העלאת קובץ
                     <Icon fontSize="small">upload</Icon>&nbsp;
                   </MDButton>
                ) : (
                  <MDButton
                  color="mekatnar"
                  size="large"
                  // onClick={clickSubmit}
                  className="btn-new-blue"
                  type="submit"
                  style={{ width: 200 }}
                >
                  עדכון הקובץ
                  <Icon fontSize="small">upload</Icon>&nbsp;
                </MDButton>
                )}
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
