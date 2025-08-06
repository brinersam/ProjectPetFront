import { Paper, Tab, Tabs } from "@mui/material";
import { useState, type ReactNode } from "react";
import BackToMainBtn from "../../modules/Auth/components/registrationLogin/BackToMainBtn";
import TitleLabel from "../../modules/Auth/components/registrationLogin/TitleLabel";
import UserRegistration from "./Subpages/UserRegistration";
import { useSelector } from "react-redux";
import { authSelectors } from "../../modules/Auth/AuthSlice";
import VolunteerRegistration from "./Subpages/VolunteerRegistration";

export default function RegistrationPage(): ReactNode {
  const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);

  //#region Tab
  const [tab, setTab] = useState(isAuthenticated ? 1 : 0);
  const handleTabChange = (_event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };
  //#endregion

  return (
    <>
      <BackToMainBtn />
      <Paper
        elevation={4}
        sx={{
          padding: "2rem",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5%",
          marginBottom: "5%",
          width: "30%",
          maxHeight: "60rem",
        }}
      >
        <TitleLabel label="Registration" />
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab unselectable="on" label="Register as user" />
          <Tab label="Register as volunteer" />
        </Tabs>
        {tab == 0 ? (
          <UserRegistration disabled={isAuthenticated} />
        ) : tab == 1 ? (
          <VolunteerRegistration disabled={!isAuthenticated} />
        ) : (
          <></>
        )}
      </Paper>
    </>
  );
}
