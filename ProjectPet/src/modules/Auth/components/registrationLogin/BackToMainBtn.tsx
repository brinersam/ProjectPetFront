import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import BasicButton from "./BasicButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { PATHS } from "../../../../shared/paths";

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
