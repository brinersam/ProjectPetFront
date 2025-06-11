import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { type ReactNode } from "react";
import { Container, Switch } from "@mui/material";
import { NavLink } from "react-router-dom";
import { PATHS } from "../app/Paths";
import { useAuth } from "../context/AuthContext/AuthContext";

export default function Header(): ReactNode {
  return <HeaderHtml />;
}

function HeaderHtml(): ReactNode {
  const { accessToken } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar className="flex justify-between">
            <div className="flex justify-around space-x-8">
              <NavLink to={PATHS.Index}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  ProjectPet
                </Typography>
              </NavLink>
              {VolunteerNavLinkHtml()}
              {HelpAnimalsNavLinkHtml()}
            </div>

            {ProfileSectionHtml()}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );

  function HelpAnimalsNavLinkHtml() {
    return (
      <NavLink to={PATHS.Volunteer}>
        <span className="text-white">Помочь животным</span>
      </NavLink>
    );
  }

  function VolunteerNavLinkHtml() {
    return (
      <NavLink to={PATHS.Volunteer}>
        <span className="text-white">Волонтеры</span>
      </NavLink>
    );
  }

  function ProfileSectionHtml(): ReactNode {
    return (
      <div className="flex justify-between">
        {accessToken ? LoggedInHtml() : NotLoggedInHtml()}
      </div>
    );
  }

  function LoggedInHtml(): ReactNode {
    return (
      <>
        <NavLink to={PATHS.Favorites}>
          <Button color="inherit">Favorites</Button>
        </NavLink>
        <NavLink to={PATHS.Profile}>
          <Button color="inherit">Profile</Button>
        </NavLink>
      </>
    );
  }
  function NotLoggedInHtml(): ReactNode {
    return (
      <>
        <NavLink to={PATHS.Login}>
          <Button color="inherit">Login</Button>
        </NavLink>
      </>
    );
  }
}
