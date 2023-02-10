import React from "react"
import { Checkbox, Grid, InputAdornment, TextField, Typography } from "@mui/material"

interface CardHolderInputsProps {
  cardHolder: boolean
}

const CardHolderInputs: React.FC<CardHolderInputsProps> = ({ cardHolder }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item md={2} sm={2} xs={2}>
        <Typography variant="button">card holder</Typography>
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <Checkbox checked={cardHolder}></Checkbox>
      </Grid>
      <Grid item md={2} sm={2} xs={3}>
        <TextField
          size="small"
          label="Cost"
          disabled={true}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={"?"}
        ></TextField>
      </Grid>
    </Grid>
  )
}

export default CardHolderInputs
