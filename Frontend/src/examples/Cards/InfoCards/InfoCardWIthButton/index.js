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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

function InfoCardWIthButton({ color, title, valueInfo, buttonInfo, icon }) {
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          <MDTypography variant="h4">{valueInfo}</MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        <MDButton
          variant="gradient"
          color={buttonInfo.color}
          onClick={buttonInfo.onClickFunction}
          iconOnly
        >
          <Icon>{buttonInfo.icon}</Icon>
        </MDButton>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
InfoCardWIthButton.defaultProps = {
  color: "mekatnar",
  buttonInfo: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the InfoCardWIthButton
InfoCardWIthButton.propTypes = {
  color: PropTypes.oneOf([
    "info",
    "primary",
    "secondary",
    "mekatnar",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  valueInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  buttonInfo: PropTypes.shape({
    color: PropTypes.oneOf([
      "info",
      "primary",
      "secondary",
      "mekatnar",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    onClickFunction: PropTypes.func,
    icon: PropTypes.node.isRequired,
  }),
  icon: PropTypes.node.isRequired,
};

export default InfoCardWIthButton;