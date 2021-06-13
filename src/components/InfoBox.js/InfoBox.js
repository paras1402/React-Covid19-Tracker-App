import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox__cases" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox__cases">{cases}</h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
