import { Grid, Pagination, Skeleton } from "@mui/material";
import type { PetResponse } from "../../../api/Pets/Models/PetResponse";
import type { PagedList } from "../../../models/responses";
import PetCard from "./PetCard";

export default function PetResultsBox({
  petsDatas,
  isError,
  isLoading,
  page,
  setPage,
}: {
  petsDatas: PagedList<PetResponse[]> | undefined;
  isError: boolean;
  isLoading: boolean;
  page: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const onPaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const take = 4;

  const pages: number | undefined = petsDatas?.totalCount
    ? Math.ceil(petsDatas?.totalCount! / take)
    : undefined;

  return (
    <>
      <Grid
        container
        sx={{
          justifyContent: "space-around",
          padding: "1rem",
          maxHeight: "45rem",
          overflow: "auto",
        }}
        rowSpacing={6}
        columnSpacing={2}
      >
        {isLoading ? (
          SkeletonPets()
        ) : isError ? (
          <img src="/error.png" />
        ) : (
          petsDatas?.data?.map((x) => <PetCard petData={x} key={x.id} />)
        )}
      </Grid>
      <Pagination
        page={page ?? 1}
        onChange={onPaginationChange}
        sx={{ marginTop: "1rem", paddingLeft: "30%" }}
        count={pages ?? 10}
      />
    </>
  );

  function SkeletonPets() {
    const amount = 4;
    return Array.from({ length: amount }).map((_, idx) => (
      <Skeleton key={idx} variant="rounded" width="25rem" height="33rem" />
    ));
  }
}
