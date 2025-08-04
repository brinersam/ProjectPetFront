import { AppBar, Container, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { type ReactNode } from "react";

export default function Footer(): ReactNode {
  return <FooterHtml />;
}

function FooterHtml() {
  return (
    <Box
      sx={{
        minHeight: "5rem",
      }}
    >
      <AppBar position="static">
        <Container sx={{ minHeight: 5 + "rem" }}>
          <Toolbar className="flex justify-between">
            <div className="flex justify-around space-x-8">
              <span className="text-white">TG</span>
              <span className="text-white">Mail</span>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
