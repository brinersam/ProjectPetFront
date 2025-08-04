import { IconButton } from "@mui/material";
import { useState, type ReactNode, useEffect } from "react";
import type { QueryModifierSorting } from "../../../shared/helpers/queryTypes";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

export default function SortingButton<TFields extends Record<string, any>>(
  sorting: QueryModifierSorting<TFields>
) {
  const [buttonState, setButtonState] = useState<"inactive" | "asc" | "desc">(
    "inactive"
  );

  const [buttonImage, setbuttonImage] = useState<ReactNode>(<UnfoldMoreIcon />);

  const IsCurrentSorterDisabled =
    sorting.sortingValue[sorting.field] == undefined ||
    sorting.sortingValue[sorting.field] == false;

  useEffect(() => {
    // react to state mutations
    if (buttonState == "inactive") {
      setbuttonImage(<UnfoldMoreIcon />);
      if (!IsCurrentSorterDisabled) {
        sorting.setSorting({} as TFields);
      }
      return;
    }

    const newSorting: Record<string, any> = {};
    newSorting[sorting.field] = true;

    switch (buttonState) {
      case "asc":
        setbuttonImage(<ArrowUpwardIcon />);
        newSorting.sortAsc = true;
        break;
      case "desc":
        setbuttonImage(<ArrowDownwardIcon />);
        newSorting.sortAsc = false;
        break;
    }

    sorting.setSorting(newSorting as TFields);
  }, [buttonState]);

  useEffect(() => {
    // react to sorting resets
    if (IsCurrentSorterDisabled) {
      setButtonState("inactive");
    }
  }, [sorting.sortingValue]);

  function CycleState() {
    switch (buttonState) {
      case "inactive":
        setButtonState("asc");
        break;
      case "asc":
        setButtonState("desc");
        break;
      case "desc":
        setButtonState("inactive");
        break;
    }
  }

  return <IconButton onClick={CycleState}>{buttonImage}</IconButton>;
}
