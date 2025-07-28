import { Paper, Grid, Divider, Typography, Button } from "@mui/material";
import type { PetResponse } from "../../../api/Pets/Models/PetResponse";
import PetImg from "./PetImg";
import { useEffect, useState } from "react";

export default function PetCard({ petData }: { petData: PetResponse }) {
  return (
    <Paper
      sx={{
        borderRadius: "10%",
      }}
      elevation={6}
    >
      <Grid
        sx={{
          width: "25rem",
        }}
      >
        <PetImg petData={petData} />
        <Grid
          sx={{
            padding: "1rem",
            width: "100%",
          }}
        >
          <PetNameAgeHtml petData={petData} />
          <Divider sx={{ padding: "0.3rem" }} variant="middle" />
          {PetStatsHtml()}
          {HashTagsHtml()}
          {ButtonsHtml()}
        </Grid>
      </Grid>
    </Paper>
  );

  function PetNameAgeHtml({ petData }: { petData: PetResponse }) {
    const [ageDisplay, setAgeDisplay] = useState<string>("Unknown age");

    useEffect(() => {
      if (petData?.dateOfBirth == undefined) {
        setAgeDisplay("Unknown age");
        return;
      }
      const difference =
        new Date().getTime() - new Date(petData.dateOfBirth).getTime();
      const petAgeYears = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const petAgeMonths =
        Math.floor(difference / (1000 * 60 * 60 * 24 * 12)) % 12;
      setAgeDisplay(`Years: ${petAgeYears} Months: ${petAgeMonths}`);
    }, [petData]);

    return (
      <Grid
        container
        sx={{
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Grid size={6}>
          <Typography
            variant="h4"
            sx={{
              display: { md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
            }}
          >
            {petData?.name}
          </Typography>
        </Grid>

        <Grid size={6}>
          <Typography>{ageDisplay}</Typography>
        </Grid>
      </Grid>
    );
  }

  function ButtonsHtml() {
    return (
      <Grid
        container
        sx={{
          paddingY: "5%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Grid size={8}>
          <Paper elevation={16}>
            <Button
              sx={{
                width: "100%",
              }}
            >
              Find out more
            </Button>
          </Paper>
        </Grid>
        <Grid size={2}>
          <Paper elevation={16}>
            <Button
              sx={{
                width: 100 + "%",
              }}
            >
              Fav
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  function PetStatsHtml() {
    return (
      <Grid
        sx={{
          width: "100%",
        }}
      >
        <Typography>Vaccination : true</Typography>
        <Typography>Humans : loves</Typography>
        <Typography>Animals : loves</Typography>
      </Grid>
    );
  }

  function HashTagsHtml() {
    return (
      <Grid
        sx={{
          height: 5 + "%",
          width: 100 + "%",
          overflow: "hidden",
          paddingTop: "5%",
        }}
      >
        <Typography>
          #Lorem #ipsum #dolor #sit #amet #consectetur #adipisicing #elit
          #Eligendi
        </Typography>
      </Grid>
    );
  }
}
