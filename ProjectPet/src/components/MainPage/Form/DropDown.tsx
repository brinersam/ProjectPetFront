import {
  MenuItem,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { type JSX, type ReactNode } from "react";
import type { QueryModifierSorting } from "../../../shared/helpers/queryTypes";
import SortingButton from "./SortingButton";
import ClearAllIcon from "@mui/icons-material/ClearAll";

type MenuOption = {
  label: string | JSX.Element;
  value: any | undefined;
};

type DropDownProps<TSorting extends Record<string, any>> = {
  label: string;
  values?: MenuOption[];
  sorting?: QueryModifierSorting<TSorting>;
};

export default function DropDown<TSorting extends Record<string, any>>({
  label,
  values = [],
  sorting = undefined,
}: DropDownProps<TSorting>): ReactNode {
  const mappedMenuValues = [
    { label: <ClearAllIcon />, value: undefined },
    ...values,
  ].map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.label}
    </MenuItem>
  ));

  const HasSorting = () => sorting !== undefined;

  const SortingButtonMaybe = () =>
    sorting ? (
      <Grid size={1}>
        <SortingButton<TSorting>
          field={sorting.field}
          setSorting={sorting.setSorting}
          sortingValue={sorting.sortingValue}
        />
      </Grid>
    ) : null;

  return (
    <Paper
      square={false}
      elevation={8}
      sx={{
        padding: 1 + "%",
        display: "flex",
        alignItems: "center",
        minWidth: 100 + "%",
      }}
    >
      <FormControl variant="filled" size="small" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Grid container>
          <Grid size={HasSorting() ? 11 : 12}>
            <Select sx={{ width: "100%" }}>{mappedMenuValues}</Select>
          </Grid>
          {SortingButtonMaybe()}
        </Grid>
      </FormControl>
    </Paper>
  );
}
