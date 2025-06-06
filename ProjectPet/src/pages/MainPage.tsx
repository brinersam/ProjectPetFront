import { type ReactNode } from "react";
import "./MainPage.css";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Pagination,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export default function MainPage() {
  return <RenderHtml />;

  function RenderHtml(): ReactNode {
    return (
      <Container sx={{ paddingY: 2 + "rem" }} maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={4}>{SearchBoxHtml()}</Grid>
          <Grid size={8}>{PetResultsBoxHtml()}</Grid>
        </Grid>
      </Container>
    );
  }

  function SearchBoxHtml() {
    return (
      <Paper elevation={2}>
        <List>
          <ListItem>{LabelHtml("Поиск")}</ListItem>

          <ListItem>{SearchBarHtml("Имя")}</ListItem>
          <ListItem>{DropDownHtml("Вид")}</ListItem>

          <Divider variant="middle" component="li" />

          <ListItem>{LabelHtml("Фильтры")}</ListItem>

          <ListItem>{DropDownHtml("Пол")}</ListItem>
          <ListItem>{DropDownHtml("Порода")}</ListItem>
          <ListItem>{DropDownHtml("Окрас")}</ListItem>
          <ListItem>{DropDownHtml("Место нахождения")}</ListItem>
          <ListItem>{DropDownHtml("Статус")}</ListItem>
          <ListItem>{CheckBoxHtml("Прививки")}</ListItem>
          <ListItem>{CheckBoxHtml("Стерилизация")}</ListItem>
        </List>
      </Paper>
    );

    function LabelHtml(propText: string, propVariant: null | any = null) {
      return (
        <Typography variant={propVariant ? propVariant : "h6"}>
          {propText}
        </Typography>
      );
    }

    function CheckBoxHtml(label: string) {
      return (
        <Paper
          square={false}
          elevation={30}
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

    function DropDownHtml(
      label: string,
      values: Array<{ label: string; value: any }> = []
    ): ReactNode {
      const valueHtmls = values.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ));

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
            <Select>
              <MenuItem value="">
                <em>
                  <ClearAllIcon />
                </em>
              </MenuItem>
              {valueHtmls}
            </Select>
          </FormControl>
        </Paper>
      );
    }

    function SearchBarHtml(label: string) {
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
          <TextField
            fullWidth
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
        </Paper>
      );
    }
  }

  function PetResultsBoxHtml() {
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
          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
        </Grid>
        <Pagination sx={{ marginTop: "1rem", paddingLeft: "30%" }} count={10} />
      </>
    );

    function PetCard() {
      return (
        <Paper
          sx={{
            borderRadius: "10%",
          }}
          elevation={6}
        >
          <Grid
            sx={{
              width: "25rem",
            }}
          >
            {PetImgHtml()}
            <Grid
              sx={{
                padding: "1rem",
                width: "100%",
              }}
            >
              {PetNameAgeHtml()}
              <Divider sx={{ padding: "0.3rem" }} variant="middle" />
              {PetStatsHtml()}
              {HashTagsHtml()}
              {ButtonsHtml()}
            </Grid>
          </Grid>
        </Paper>
      );

      function PetImgHtml() {
        return (
          <Grid
            sx={{
              borderRadius: "inherit",
              maxHeight: "15rem",
              maxWidth: "100%",
              overflow: "hidden",
              marginBottom: "0.5rem",
            }}
          >
            <img
              className="overflow-hidden, rounded-4xl "
              src={
                "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            ></img>
          </Grid>
        );
      }

      function PetNameAgeHtml() {
        return (
          <Grid
            container
            sx={{
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Grid size={6}>
              <Typography
                variant="h4"
                sx={{
                  display: { md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                }}
              >
                CatName
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography>1 year 5 months old</Typography>
            </Grid>
          </Grid>
        );
      }

      function ButtonsHtml() {
        return (
          <Grid
            container
            sx={{
              paddingY: "5%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Grid size={8}>
              <Paper elevation={60}>
                <Button
                  sx={{
                    width: "100%",
                  }}
                >
                  Find out more
                </Button>
              </Paper>
            </Grid>
            <Grid size={2}>
              <Paper elevation={60}>
                <Button
                  sx={{
                    width: 100 + "%",
                  }}
                >
                  Fav
                </Button>
              </Paper>
            </Grid>
          </Grid>
        );
      }

      function PetStatsHtml() {
        return (
          <Grid
            sx={{
              width: "100%",
            }}
          >
            <Typography>Vaccination : true</Typography>
            <Typography>Humans : loves</Typography>
            <Typography>Animals : loves</Typography>
          </Grid>
        );
      }

      function HashTagsHtml() {
        return (
          <Grid
            sx={{
              height: 5 + "%",
              width: 100 + "%",
              overflow: "hidden",
              paddingTop: "5%",
            }}
          >
            <Typography>
              #Lorem #ipsum #dolor #sit #amet #consectetur #adipisicing #elit
              #Eligendi
            </Typography>
          </Grid>
        );
      }
    }
  }
}
