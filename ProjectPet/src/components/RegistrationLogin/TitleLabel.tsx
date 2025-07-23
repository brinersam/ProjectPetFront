import { Typography } from "@mui/material";

export default function TitleLabel({ label }: { label: string }) {
  return (
    <Typography
      variant="h4"
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "33%",
        marginBottom: "2rem",
        display: { md: "flex" },
        fontFamily: "monospace",
        fontWeight: 700,
        color: "inherit",
      }}
    >
      {label}
    </Typography>
  );
}
