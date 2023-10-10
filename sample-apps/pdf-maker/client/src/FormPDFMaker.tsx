import React from 'react';
import * as api from "./api";
import { Button, Paper, Typography } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputText } from "./form-components/FormInputText";
import { FormInputDate } from "./form-components/FormInputDate";
import { BodygraphScreen } from "./BodygraphScreen";
const { useState } = React;

interface IFormInput {
   name: string;
   birthdate: Date;
   birthtime: string;
   location: string;
}

const defaultValues = {
  name: "Jonah Sage Dempcy",
  birthdate: new Date("26-Sep-83"),
  birthtime: "00:48",
  location: "Malden, Massachussets"
};

export const FormPDFMaker = () => {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, watch } = methods;
  const [bg, setBg] = useState<any>({});
  const [totalProcessingTime, setTotalProcessingTime] = useState(-1);

  const onSubmit = (data: IFormInput) => {
    // Generate a PDF report and get back bodygraph data to display in the client
    api.generatePDFReport(data)
                            .then(response =>
                              response.json().then(data => ({
                                bg: data,
                                status: response.status
                              })
                            ).then(res => {
                                setBg(res.bg);
                                setTotalProcessingTime(res.bg.totalProcessingTime);

                                // Download the bodygraph as a JSON file
                                const a = document.createElement('a');
                                a.href = URL.createObjectURL( new Blob([JSON.stringify(res.bg, null, 2)], { type: 'application/json' }) );
                                a.download = `bodygraph-${res.bg.id}-${res.bg.name.split(" ").join("_")}.json`;
                                a.click();
                            }));

  }

      if (bg.name === undefined) {
        return (
        <Paper
          style={{
            display: "grid",
            gridRowGap: "20px",
            padding: "20px",
            margin: "10px 300px",
          }}
        >
          <Typography variant="h6">Enter Name, Date, Time, and Location</Typography>
          <FormInputText name="name" control={control} label="Name" />
          <FormInputDate name="birthdate" control={control} label="Birth Date" />
          <FormInputText name="birthtime" control={control} label="Birth Time (e.g. 20:48)" />
          <FormInputText name="location" control={control} label="Location (optional—e.g. paris france)" />
          <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
            {" "}
            Submit{" "}
          </Button>
        </Paper>
      )} else { // Bodygraph is loaded
        return (
        <Paper
          style={{
            display: "grid",
            gridRowGap: "20px",
            padding: "20px",
            margin: "10px 300px",
          }}
        >
          <BodygraphScreen bg={bg} />
          <Typography variant="body1">Bodygraph Generated in {totalProcessingTime}ms</Typography>
          <Typography variant="body2">Bodygraph Details:<br/>Name: {bg.name}<br/>Type: {bg.type}<br/>Authority: {bg.authority}<br/>Profile: {bg.profile}<br/>Definition: {bg.definition}<br/><br/></Typography>
          <Typography variant="h6">Generate another bodygraph</Typography>
          <FormInputText name="name" control={control} label="Name" />
          <FormInputDate name="birthdate" control={control} label="Birth Date" />
          <FormInputText name="birthtime" control={control} label="Birth Time (e.g. 20:48)" />
          <FormInputText name="location" control={control} label="Location (optional—e.g. paris france)" />
          <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
            {" "}
            Submit{" "}
          </Button>
        </Paper>
      )}
};
