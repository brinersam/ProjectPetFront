import { Paper, ListItemText, Checkbox } from "@mui/material";

export default function CheckBox({ label }: { label: string }) {
  return (
    <Paper
      square={false}
      elevation={16}
      sx={{
        padding: 1 + "%",
        display: "flex",
        alignItems: "center",
        minWidth: 100 + "%",
      }}
    >
      <ListItemText sx={{ paddingLeft: 1 }}>{label}</ListItemText>
      <Checkbox />
    </Paper>
  );
}
