import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../app/Paths";
import BasicButton from "./BasicButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function BackToMainBtn() {
  return (
    <Paper sx={{ width: "40%" }}>
      <NavLink to={PATHS.Index}>
        <BasicButton
          label={
            <>
              <ArrowBackIosIcon />
              Back to Main
            </>
          }
          elevation={3}
        />
      </NavLink>
    </Paper>
  );
}
