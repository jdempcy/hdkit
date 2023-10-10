/*global Q, LargeLocalStorage*/
import React, { useEffect, useState } from "react";
import { getGateDescription, getGateName, getLineDescription, getLineDetrimentingDescription, getLineDetrimentingPlanet, getLineExaltingDescription, getLineExaltingPlanet, getLineName, getMotivation, getPerspective } from '../hd-utils/gate-line-color-data';
import { getSunrise, getSunset } from "sunrise-sunset-js"

import Bodygraph from "../widgets/Bodygraph";
import BodygraphPersonality from '../widgets/BodygraphPersonality';
import Button from "@mui/material/Button";
import { DateTime } from "luxon";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { oppositeGate } from '../hd-utils/opposite-gate';
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
  textAlign: "center",
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.secondary,
}));

export default function DashboardLandingScreenWidget() {
  const [currentMoment, setCurrentMoment] = useState("");
  const [todayMessage, setTodayMessage] = useState("");
  const [timeRemainingMessage, setTimeRemainingMessage] = useState("");
  const [nextLine, setNextLine] = useState("");
  const [currentActivation, setCurrentActivation] = useState(false);
  const [stateEphemeris, setStateEphemeris] = useState(false);
  const [currentSunGate, setCurrentSunGate] = useState("");
  const [currentSunGateName, setCurrentSunGateName] = useState("");
  const [currentSunGateDescription, setCurrentSunGateDescription] = useState("");
  const [currentSunLine, setCurrentSunLine] = useState("");
  const [currentSunLineName, setCurrentSunLineName] = useState("");
  const [currentSunLineDescription, setCurrentSunLineDescription] = useState("");
  const [currentSunLineExaltingPlanet, setCurrentSunLineExaltingPlanet] = useState("");
  const [currentSunLineExaltingDescription, setCurrentSunLineExaltingDescription] = useState("");
  const [currentSunLineDetrimentingPlanet, setCurrentSunLineDetrimentingPlanet] = useState("");
  const [currentSunLineDetrimentingDescription, setCurrentSunLineDetrimentingDescription] = useState("");
  const [currentSunColor, setCurrentSunColor] = useState("");
  const [currentSunColorName, setCurrentSunColorName] = useState("");
  const [currentEarthGate, setCurrentEarthGate] = useState("");
  const [currentEarthLine, setCurrentEarthLine] = useState("");
  const [currentNodeColor, setCurrentNodeColor] = useState("");
  const [currentNodeColorName, setCurrentNodeColorName] = useState("");
  const [currentMoonGate, setCurrentMoonGate] = useState("");
  const [currentMoonLine, setCurrentMoonLine] = useState("");
  const [currentNorthNodeGate, setCurrentNorthNodeGate] = useState("");
  const [currentNorthNodeLine, setCurrentNorthNodeLine] = useState("");
  const [currentSouthNodeGate, setCurrentSouthNodeGate] = useState("");
  const [currentSouthNodeLine, setCurrentSouthNodeLine] = useState("");

  
  var storage = {};
  var sunriseMs = -1;
  var sunsetMs = -1;
  var ephemeris = null;

  function initialize(userLatitudeLongitude) {
    let latitude = userLatitudeLongitude.split(", ")[0];
    let longitude = userLatitudeLongitude.split(", ")[1];
    sunriseMs = getSunrise(latitude, longitude).getTime();
    sunsetMs = getSunset(latitude, longitude).getTime();
    let year = DateTime.now().toFormat("yyyy");

    storage
      .getContents(`ephemeris-annual-forecast-${year}`)
      .then(function (content) {
        let cachedEphemeris = content;
        console.log('Checking ephemeris...')
        if (cachedEphemeris !== null && cachedEphemeris !== "null") {
          console.log("Setting cached ephemeris...");
          ephemeris = JSON.parse(cachedEphemeris);
          setStateEphemeris(ephemeris);
        } else {
          console.log("Fetching ephemeris...");
          fetch(
            `https://hdblacklist-proxy.herokuapp.com/https://hungry-goldwasser-6106a1.netlify.app/ephemeris-annual-forecast-${year}-1s-accuracy.json`
          ).then((response) => {
            response.json().then((jsonData) => {
              console.log("setting json data", jsonData);
              jsonData.year = year;
              ephemeris = jsonData;
              setStateEphemeris(jsonData);
              storage
                .setContents(
                  `ephemeris-annual-forecast-${year}`,
                  JSON.stringify(jsonData)
                )
                .then(function () {
                  setCurrentActivation(getActivationData());
                }); // Finish setting content in LargeLocalStorage
            }); // End json()
          }); // End then() from fetch()
        } // End else
      }, function() { // Rejected
        storage.setContents(`ephemeris-annual-forecast-${year}`, "null").then(function() {
          initialize(); // Recursive!
        });
      }); // End storage getContents() then()
  } // End initialize()

  useEffect(() => {
    var desiredCapacity = 50 * 1024 * 1024; // 50MB
    storage = new LargeLocalStorage({
      size: desiredCapacity, // desired capacity, in bytes.

      // This is the name given to the underlying IndexedDB or WebSQL DB or FSAPI Folder. LLS's with different names are independent.
      name: "hdblacklist",

      // the following is an optional param that is useful for debugging. force LLS to use a specific storage implementation
      // forceProvider: 'IndexedDB' or 'WebSQL' or 'FilesystemAPI'
    });
    storage.initialized.then(function (pipeline) {
      let capacity = pipeline.getCapacity();
      if (capacity != -1 && capacity != desiredCapacity) {
        // the user didn't authorize your storage request
        // so instead you have some limitation on your storage
        console.log("Please approve the full amount of storage space.");
      } else {
        console.log("The full capacity was approved.");
      }
      let userLatLong = localStorage.getItem("user-latitude-longitude");
      if (userLatLong !== null) {
        initialize(userLatLong);
      }
    });

    const interval = setInterval(() => {

      if (ephemeris === null || sunsetMs === -1)  {
        return;
      }
 
      let date = new Date();
      let currentActivationData = getActivationData();
      setCurrentActivation(currentActivationData);
      setCurrentMoment(
        DateTime.fromISO(date.toISOString()).toLocaleString(
          DateTime.DATETIME_MED
        )
      );
        let todayMessageObject = getFormattedTodayMessage(date, currentActivationData);
        console.log('todayMessageObject', todayMessageObject);
        setTodayMessage(todayMessageObject.formattedTodayMessage);
        setTimeRemainingMessage(todayMessageObject.timeRemainingMessage);
        setNextLine(todayMessageObject.nextLine);
        setCurrentSunGate(currentActivationData.Sun.g);
        setCurrentSunGateName(getGateName(currentActivationData.Sun.g));
        setCurrentSunGateDescription(getGateDescription(currentActivationData.Sun.g));
        setCurrentSunLine(currentActivationData.Sun.l);
        setCurrentSunLineName(getLineName(currentActivationData.Sun.g, currentActivationData.Sun.l));
        setCurrentSunLineDescription(getLineDescription(currentActivationData.Sun.g, currentActivationData.Sun.l));
        setCurrentSunLineExaltingPlanet(getLineExaltingPlanet(currentActivationData.Sun.g, currentActivationData.Sun.l));
        setCurrentSunLineExaltingDescription(getLineExaltingDescription(currentActivationData.Sun.g, currentActivationData.Sun.l));
        setCurrentSunLineDetrimentingPlanet(getLineDetrimentingPlanet(currentActivationData.Sun.g, currentActivationData.Sun.l));
        setCurrentSunLineDetrimentingDescription(getLineDetrimentingDescription(currentActivationData.Sun.g, currentActivationData.Sun.l));
        setCurrentSunColor(currentActivationData.Sun.c);
        setCurrentSunColorName(getMotivation(currentActivationData.Sun.c));
        setCurrentEarthGate(currentActivationData.Earth.g);
        setCurrentEarthLine(currentActivationData.Earth.l);
        setCurrentNodeColor(currentActivationData.NorthNode.c);
        setCurrentNodeColorName(getPerspective(currentActivationData.NorthNode.c));
        setCurrentMoonGate(currentActivationData.Moon.g);
        setCurrentMoonLine(currentActivationData.Moon.l);
        setCurrentNorthNodeGate(currentActivationData.NorthNode.g);
        setCurrentNorthNodeLine(currentActivationData.NorthNode.l);
        setCurrentSouthNodeGate(currentActivationData.SouthNode.g);
        setCurrentSouthNodeLine(currentActivationData.SouthNode.l);
    }, 1000); // End setInterval()

    return () => clearInterval(interval);
  }, []); // End useEffect for one-time run

  function getLatitudeLongitude() {
    navigator.geolocation.getCurrentPosition((position) => {
      localStorage.setItem(
        "user-latitude-longitude",
        `${position.coords.latitude}, ${position.coords.longitude}`
      );
      initialize(`${position.coords.latitude}, ${position.coords.longitude}`);
    });
  }

  function invalidateCache() {
    localStorage.removeItem("current-activation");
    localStorage.removeItem("current-activation-timestamp");
    localStorage.removeItem("next-match-timestamp"); // The next entry over in the ephemeris (not necessarily the next change of Sun Line or anything, could just be e.g. Moon Color)
    localStorage.removeItem("next-sun-line-timestamp"); // Time of change for the Sun line
    
  }

  function getActivationData() {
    if (ephemeris === null) {
      return;
    }
    let currentTime = -1;
    let endOfYearTimestamp = new Date(
      Date.UTC(parseInt(ephemeris.year) + 1, 0, 1)
    );
    endOfYearTimestamp = Math.floor(endOfYearTimestamp / 1000); // e.g. 1672531200 for the end of 2021

    let currentActivationTimestamp = localStorage.getItem(
      "current-activation-timestamp"
    );
    var cActivation = JSON.parse(localStorage.getItem("current-activation"));

    if (!currentActivationTimestamp || !cActivation) {
      currentTime = new Date().getTime() / 1000; // e.g. 1643058732.234
      currentTime = Math.floor(currentTime); // e.g. 1643058732
      // Search for activation starting at current timestamp and working backward
      let match = null;
      while (match == null) {
        match = ephemeris.positions[currentTime + "000"];
        currentTime = currentTime - 1;
      }
      localStorage.setItem("current-activation-timestamp", currentTime + 1);
      localStorage.setItem("current-activation", JSON.stringify(match));
      currentActivationTimestamp = currentTime + 1;
      cActivation = match;
    }

    var nextMatchTimestamp = localStorage.getItem("next-match-timestamp");
    if (!nextMatchTimestamp) {
      // Look for the next change
      currentTime = Math.floor(new Date().getTime() / 1000); // e.g. 1643058732
      let nextChangeMatch = null;
      let nextSunLine = cActivation.Sun.l;
      let nextChangeTimestamp = -1;
      let nextSunLineTimestamp = -1;
      while (
        currentTime < endOfYearTimestamp &&
        (nextChangeMatch === null || nextSunLine === cActivation.Sun.l)
      ) {
        if (nextChangeMatch === null || nextChangeMatch === undefined) {
          nextChangeMatch = ephemeris.positions[currentTime + "000"];
          if (nextChangeMatch !== null) {
            nextChangeTimestamp = currentTime;
          }
        } else {
          // Once we've found the next change, keep going to find next Sun Line
          nextSunLine = nextChangeMatch.Sun.l; // Check to see if next match contains a change
          if (nextSunLine == cActivation.Sun.l) {
            // If not, keep looking in ephemeris
            let entry = ephemeris.positions[currentTime + "000"];
            if (entry !== null && entry !== undefined) {
              // Eventualy, find the next Sun Line
              nextSunLine = entry.Sun.l;
              nextSunLineTimestamp = currentTime;
            }
          } else {
            nextSunLineTimestamp = currentTime;
          }
        }
        currentTime = currentTime + 1;
      }
      if (currentTime >= endOfYearTimestamp) {
        let ephemerisNextYear = fetch(
          `https://hdblacklist-proxy.herokuapp.com/https://hungry-goldwasser-6106a1.netlify.app/ephemeris-annual-forecast-${
            ephemeris.year + 1
          }-1s-accuracy.json`
        ).then((response) => {
          response.json().then((jsonData) => {
            return jsonData;
          });
        });
        // Do it all again for the next year
        while (
          currentTime < endOfYearTimestamp &&
          (nextChangeMatch === null || nextSunLine === cActivation.Sun.l)
        ) {
          if (nextChangeMatch === null || nextChangeMatch === undefined) {
            nextChangeMatch = ephemeris.positions[currentTime + "000"];
            if (nextChangeMatch !== null) {
              nextChangeTimestamp = currentTime;
            }
          } else {
            // Once we've found the next change, keep going to find next Sun Line
            nextSunLine = nextChangeMatch.Sun.l; // Check to see if next match contains a change
            if (nextSunLine == cActivation.Sun.l) {
              // If not, keep looking in ephemeris
              let entry = ephemeris.positions[currentTime + "000"];
              if (entry !== null || entry !== undefined) {
                // Eventualy, find the next Sun Line
                nextSunLine = entry.Sun.l;
                nextSunLineTimestamp = currentTime;
              }
            } else {
              nextSunLineTimestamp = currentTime;
            }
          }
          currentTime = currentTime + 1;
        }
      }
      localStorage.setItem("next-match-timestamp", nextChangeTimestamp);
      localStorage.setItem("next-sun-line-timestamp", nextSunLineTimestamp);
      nextMatchTimestamp = currentTime - 1;
    }

    nextMatchTimestamp = new Date(parseInt(nextMatchTimestamp + "000"));
    let nextChange = DateTime.fromJSDate(nextMatchTimestamp);
    let timeDiff = nextChange.diff(DateTime.now(), [
      "hours",
      "minutes",
      "seconds",
    ]);
    if (timeDiff.seconds < 0) {
      // Negative seconds means the nextChange has occurred and the cache is invalid
      invalidateCache();
    }

    // Fix the ephemeris for SouthNode and Earth positions
    cActivation.Earth.g = oppositeGate(cActivation.Sun.g);
    cActivation.SouthNode.g = oppositeGate(cActivation.NorthNode.g);
    return cActivation;
  }

  function getFormattedTodayMessage(currentDate, currentActivationData) {
    let nextSunLineTimestamp = localStorage.getItem("next-sun-line-timestamp");
    nextSunLineTimestamp = new Date(parseInt(nextSunLineTimestamp  + '000'));
    let formattedTodayMessage = `The Sun is in Line ${currentActivationData.Sun.l}`;
    // // Length of day is sunsetMs - sunriseMs
    // let lengthOfDay = sunsetMs - sunriseMs;
    // if (currentDateMs < sunriseMs) {
    //   // Between midnight and sunrise
    //   if (sunriseMs - currentDateMs < 900000) {
    //     // If less than 2 hours till sunrise...
    //     formattedTodayMessage += "It is almost dawn. ";
    //   }
    //   formattedTodayMessage += `It will be a ${formattedLineOfDay} day.`;
    // } else if (currentDateMs < sunsetMs) { // During the day...
    //   formattedTodayMessage += `It is a ${formattedLineOfDay} day.`;
    // } else {
    //   formattedTodayMessage += `It was a ${formattedLineOfDay} day.`;
    // }      
    let nextChange = DateTime.fromJSDate(nextSunLineTimestamp);
    let timeDiff = nextChange.diff(DateTime.now(), ['hours', 'minutes', 'seconds']);
    let timeRemaining = "";
    if (timeDiff.hours > 0) {
      timeRemaining += `${timeDiff.hours}h `;  
    }
    if (timeDiff.minutes > 0) {
      timeRemaining += `${timeDiff.minutes}m `;  
    }
    timeRemaining += `${Math.floor(timeDiff.seconds)}s`;
    let nextLine = parseInt(currentActivationData.Sun.l) + 1;
    if (nextLine === 7) { nextLine = 1; }
  
    let remainingMessage = `Line ${nextLine} in ${timeRemaining}`;

    return {
        formattedTodayMessage: formattedTodayMessage,
        timeRemainingMessage: remainingMessage,
        nextLine: nextLine
    };
  }
  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={5}>


        <Grid container spacing={2}>
         <Grid item xs={9}>
 
              {stateEphemeris ? <Bodygraph activation={currentActivation} ephemeris={stateEphemeris} /> : ""}

        </Grid>
        <Grid item xs={3}>
              {stateEphemeris ? <BodygraphPersonality activation={currentActivation} /> : ""}
        </Grid>
        </Grid>
        </Grid>
    

          
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align="left" variant="body2" gutterBottom>
                Current Moment: {currentMoment}
              </Typography>


                <Typography align="left" variant="body2">
                  {localStorage.getItem("user-latitude-longitude") !== null ? (todayMessage) : (
                    <Button variant="contained" onClick={getLatitudeLongitude}>
                      Enable
                    </Button>
                  )}
                </Typography>
                <Typography align="left" variant="caption"
                                  display="block"
                >
                    {timeRemainingMessage}
                </Typography>

            </Grid>
            <Grid item xs={6}>
              <Item>
              <Typography
                  align="left"
                  variant="overline"
                  display="block"
                  gutterBottom
                >
                  Sun
                </Typography>
             
                <Typography align="left" variant="body1" gutterBottom>
                  Gate {currentSunGate} - {currentSunGateName}
                </Typography>
                <Typography align="left" variant="body2" gutterBottom>
                  {currentSunGateDescription}
                </Typography>
                <Typography align="left" variant="body1" gutterBottom>
                  Line {currentSunLine} - {currentSunLineName}
                </Typography>
                <Typography align="left" variant="body2" gutterBottom>
                  {currentSunLineDescription}
                </Typography>
                <Typography align="left" variant="body2" gutterBottom>
                  ↑ {currentSunLineExaltingPlanet} | {currentSunLineExaltingDescription}
                </Typography>
                <Typography align="left" variant="body2" gutterBottom>
                  ↓ {currentSunLineDetrimentingPlanet} | {currentSunLineDetrimentingDescription}.
                </Typography>


              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Typography
                  align="left"
                  variant="overline"
                  display="block"
                  gutterBottom
                >
                  Program Themes
                </Typography>
                <Typography align="left" variant="body1" gutterBottom>
                  Motivation
                </Typography>
                <Typography align="left" variant="body2" gutterBottom>
                  Color {currentSunColor} - {currentSunColorName}
                </Typography>
                <Typography align="left" variant="body1" gutterBottom>
                  Perspective
                </Typography>
                <Typography align="left" variant="body2" gutterBottom>
                Color {currentNodeColor} - {currentNodeColorName}
                </Typography>
              </Item>

              <Item>
                <Typography align="left" variant="overline" display="block">
                  Moon
                </Typography>
                <Typography align="left" variant="body1" gutterBottom>
                  Gate {currentMoonGate}.{currentMoonLine}
                </Typography>
              </Item>
              <Item>
                <Typography align="left" variant="overline" display="block">
                  Earth
                </Typography>
                <Typography align="left" variant="body1" gutterBottom>
                  Gate {currentEarthGate}.{currentEarthLine}
                </Typography>
              </Item>
              <Item>
                {" "}
                <Typography
                  align="left"
                  variant="overline"
                  display="block"
                  gutterBottom
                >
                  Nodal Environment
                </Typography>
                <Typography align="left" variant="body1" gutterBottom>
                  {currentNorthNodeGate}.{currentNorthNodeLine} / {currentSouthNodeGate}.{currentSouthNodeLine}
                </Typography>
              </Item>
            </Grid>

            {/* <Grid item xs={6}>

        </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
