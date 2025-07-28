import { useEffect, useMemo, useState } from "react";
import "./MainPage.css";
import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useGetPetsPaginatedQuery } from "../api/Pets/PetApi";
import type {
  GetPetsPaginatedFilters,
  GetPetsPaginatedSorting,
} from "../api/Pets/Requests/GetPetsPaginatedRequest";
import PetResultsBox from "../components/MainPage/Results/PetResultsBox";
import { useForm } from "react-hook-form";
import SearchBar from "../components/MainPage/Form/SearchBar";
import DropDown from "../components/MainPage/Form/DropDown";
import CheckBox from "../components/MainPage/Form/CheckBox";
import ExceptionsHelper from "../app/Helpers/ExceptionsHelper";
import PanelButton from "../components/MainPage/Form/PanelButton";

export default function MainPage() {
  //#region FilterAndSorting

  //#region Filter
  type FilterFields = {
    // volunteerId?: string;
    name?: string;
    age?: number;
    // speciesName?: string;
    // breedName?: string;
    // coat?: string;
  };

  const {
    register: registerFiltersForm,
    handleSubmit: handleSubmitFiltersForm,
    reset: resetFiltersForm,
  } = useForm<FilterFields>();

  const [filters, setFilters] = useState<GetPetsPaginatedFilters>({});

  const applyFilters = (data: FilterFields) => {
    const newFilters: GetPetsPaginatedFilters = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        // @ts-ignore
        newFilters[key as keyof GetPetsPaginatedFilters] = value;
      }
    });

    setSorting({});
    setFilters(newFilters);
  };
  //#endregion

  //#region Sorting
  const [sorting, setSorting] = useState<GetPetsPaginatedSorting>({});
  //#endregion

  const resetFiltersAndSorting = () => {
    resetFiltersForm();
    setFilters({});
    setSorting({});
  };

  const [page, setPage] = useState<number>(1);

  const {
    data: petsData,
    // isLoading,
    isFetching,
    isError,
    error,
  } = useGetPetsPaginatedQuery({
    Take: 4,
    Page: page,
    Filters: filters,
    Sorting: sorting,
  });

  // reset pagination on filter update
  useMemo(() => {
    if (page != 1) setPage(1); //
  }, [filters, sorting]);
  //#endregion

  //#region Errors
  useEffect(() => {
    if (isError == false) return;
    ExceptionsHelper.ToastError(error, false);
  }, [isError]);
  //#endregion

  return (
    <Container sx={{ paddingY: "2rem" }} maxWidth="xl">
      <Grid container spacing={4}>
        <Grid size={4}>{SearchBoxHtml()}</Grid>
        <Grid size={8}>
          <PetResultsBox
            page={page}
            isError={isError}
            setPage={setPage}
            isLoading={isFetching}
            petsDatas={petsData?.result ?? undefined}
          />
        </Grid>
      </Grid>
    </Container>
  );

  function SearchBoxHtml() {
    return (
      <form onSubmit={handleSubmitFiltersForm(applyFilters)}>
        <Paper elevation={2}>
          <List>
            <ListItem>{LabelHtml("Поиск")}</ListItem>

            <ListItem>
              <SearchBar
                label={"Имя"}
                filtering={{ field: "name", register: registerFiltersForm }}
                sorting={{
                  field: "name",
                  setSorting: setSorting,
                  sortingValue: sorting,
                }}
              />
            </ListItem>
            <ListItem>
              <SearchBar
                label={"Возраст (В годах)"}
                filtering={{ field: "age", register: registerFiltersForm }}
                sorting={{
                  field: "age",
                  setSorting: setSorting,
                  sortingValue: sorting,
                }}
              />
            </ListItem>
            <ListItem>
              <DropDown label="Вид" />
            </ListItem>

            <Divider variant="middle" component="li" />

            <ListItem>{LabelHtml("Фильтры")}</ListItem>

            <ListItem>
              <DropDown label="Пол" />
            </ListItem>
            <ListItem>
              <DropDown label="Порода" />
            </ListItem>
            <ListItem>
              <DropDown
                label="Окрас"
                sorting={{
                  field: "coat",
                  setSorting: setSorting,
                  sortingValue: sorting,
                }}
              />
            </ListItem>
            <ListItem>
              <DropDown label="Место нахождения" />
            </ListItem>
            <ListItem>
              <DropDown label="Статус" />
            </ListItem>
            <ListItem>
              <CheckBox label="Прививки" />
            </ListItem>
            <ListItem>
              <CheckBox label="Стерилизация" />
            </ListItem>
            <ListItem>
              <PanelButton sx={{ width: "100%" }} label="Применить" />
            </ListItem>
            <ListItem>
              <PanelButton
                sx={{ width: "100%" }}
                onClick={resetFiltersAndSorting}
                label="Сброс"
              />
            </ListItem>
          </List>
        </Paper>
      </form>
    );

    function LabelHtml(propText: string, propVariant: null | any = null) {
      return (
        <Typography variant={propVariant ? propVariant : "h6"}>
          {propText}
        </Typography>
      );
    }
  }
}
