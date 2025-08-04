import { Grid, Paper, TextField, InputAdornment } from "@mui/material";
import type {
  QueryModifierFiltering,
  QueryModifierSorting,
} from "../../../shared/helpers/queryTypes";
import SearchIcon from "@mui/icons-material/Search";
import SortingButton from "./SortingButton";

type SearchBarProps<
  TFields extends Record<string, any>,
  TSorting extends Record<string, any>
> = {
  label: string;
  filtering: QueryModifierFiltering<TFields>;
  sorting?: QueryModifierSorting<TSorting>;
};

export default function SearchBar<
  TFields extends Record<string, any>,
  TSorting extends Record<string, any>
>({
  label,
  filtering,
  sorting = undefined,
}: SearchBarProps<TFields, TSorting>) {
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
        padding: "1%",
        alignItems: "center",
        minWidth: "100%",
      }}
    >
      <Grid container>
        <Grid size={HasSorting() ? 11 : 12}>
          <TextField
            sx={{ width: "100%" }}
            {...filtering.register(filtering.field)}
            label={label}
            variant="filled"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {SortingButtonMaybe()}
      </Grid>
    </Paper>
  );
}
