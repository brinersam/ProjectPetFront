import { type SxProps, Paper, Button, type Theme } from "@mui/material";
import type { ReactNode } from "react";

export default function PanelButton({
  label,
  onClick = undefined,
  elevation = 0,
  sx,
}: {
  label: string | ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  elevation?: number;
  sx?: SxProps<Theme>;
}) {
  return (
    <Paper sx={sx} elevation={elevation}>
      <Button
        type="submit"
        onClick={onClick}
        sx={{
          width: "100%",
        }}
      >
        {label}
      </Button>
    </Paper>
  );
}
