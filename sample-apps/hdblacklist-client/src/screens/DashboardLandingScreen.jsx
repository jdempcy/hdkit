import Box from "@mui/material/Box";
import CurrentMoonLine from "../widgets/CurrentMoonLine";
import CurrentSunLine from "../widgets/CurrentSunLine";
import DashboardLandingScreenWidget from "./DashboardLandingScreenWidget";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.secondary,
}));
export default function DashboardLandingScreen() {
  return (
    <div>
      <DashboardLandingScreenWidget />

      {/* <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Item>                
                        <Bodygraph />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item><CurrentSunLine /></Item>
                </Grid>
            <Grid item xs={6}>
                <Item><CurrentMoonLine /> </Item>
            </Grid>
                        
                               
            </Grid> */}
    </div>
  );
}
