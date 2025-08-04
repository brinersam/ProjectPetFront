import { Grid } from "@mui/material";
import type { PetResponse } from "../../../modules/Pets/models/PetResponse";

export default function PetImg({ petData }: { petData: PetResponse }) {
  return (
    <Grid
      sx={{
        borderRadius: "inherit",
        maxHeight: "15rem",
        maxWidth: "25rem",
        overflow: "hidden",
        marginBottom: "0.5rem",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "auto",
        }}
        className="rounded-4xl "
        src={petData?.photos?.length > 0 ? petData?.photos[0]?.url : "none"}
      ></img>
    </Grid>
  );
}
