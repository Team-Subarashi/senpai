import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import "../App.css";

export default function Footer() {
  return (
    <div>
      <div
        style={{
          display: "block",
          padding: "20px",
          height: "1px",
          width: "100%",
        }}
      ></div>
      <Box
        style={{
          textAlign: "center",
          backgroundColor: "#424242",
          position: "fixed",
          bottom: "0",
          width: "100%",
          height: "4vh",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="h4">
                <Link to={`/info`} style={{ color: "white" }}>
                  About Us
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
