import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, cases, isRed, isGreen, active, total, ...props }) {
  console.log("greennnnnnn", isGreen);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox  ${active && "infoBox--selected  "} ${
        active && isGreen && "infoBox--green"
      }`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${isGreen && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
