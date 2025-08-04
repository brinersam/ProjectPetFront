import { Typography } from "@mui/material";

export default function TitleLabel({ label }: { label: string }) {
  return (
    <Typography
      variant="h4"
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "2rem",
        fontFamily: "monospace",
        fontWeight: 700,
        color: "inherit",
        textAlign: "center",
      }}
    >
      {label}
    </Typography>
  );
}
