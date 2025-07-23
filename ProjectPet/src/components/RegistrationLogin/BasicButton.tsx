import { Button, Paper } from "@mui/material";
import type { ReactNode } from "react";

export default function BasicButton({
  label,
  elevation = 0,
}: {
  label: string | ReactNode;
  elevation?: number;
}) {
  return (
    <Paper
      sx={{
        margin: "1rem",
        width: "100%",
      }}
      elevation={elevation}
    >
      <Button
        type="submit"
        sx={{
          width: "100%",
        }}
      >
        {label}
      </Button>
    </Paper>
  );
}
