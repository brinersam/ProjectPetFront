import type { Path, UseFormRegister } from "react-hook-form";

export type QueryModifierFiltering<TFields extends Record<string, any>> = {
    field: Path<TFields>;
    register: UseFormRegister<TFields>;
  };

export type QueryModifierSorting<TFields extends Record<string, any>> = {
    field: Path<TFields>;
    sortingValue: TFields;
    setSorting: React.Dispatch<React.SetStateAction<TFields>>;
  };