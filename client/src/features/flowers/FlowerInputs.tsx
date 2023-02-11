import { FormControl, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { Flower } from "../../types/Types"
import SaveIcon from "@mui/icons-material/Done"
import UndoIcon from "@mui/icons-material/Undo"
import { useAppDispatch } from "../../app/hooks"
import { updateFlowerAsync } from "./flowersSlice"
import cloneDeep from "lodash.clonedeep"

interface FlowerInputsProps {
  flower: Flower
}

const FlowerInputs: React.FC<FlowerInputsProps> = ({ flower }) => {
  const [status, setStatus] = useState("idle")
  const [hasUpdates, setHasUpdates] = useState(false)
  const [name, setName] = useState(flower.name)
  const [price, setPrice] = useState(flower.pricePerBundle.toString())
  const [count, setCount] = useState(flower.stemCount)
  const dispatch = useAppDispatch()

  const updateFlowerName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setHasUpdates(true)
    const v = e.target.value
    setName(v)
  }

  const updateFlowerPrice = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setHasUpdates(true)
    const v = e.target.value
    setPrice(v)
  }

  const updateFlowerCount = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setHasUpdates(true)
    const v = e.target.value
    setCount(Number(v))
  }

  const onSave = async () => {
    setStatus("loading")
    const p = await dispatch(updateFlowerAsync({ ...cloneDeep(flower), name: name }))
    if (p.meta.requestStatus === "rejected") {
      setStatus("failed")
    } else {
      setHasUpdates(false)
      setStatus("idle")
    }
  }

  const onUndo = () => {
    setName(flower.name)
    setPrice(flower.pricePerBundle.toString())
    setCount(flower.stemCount)
    setHasUpdates(false)
    setStatus("idle")
  }

  return (
    <Grid container item spacing={2} alignItems="center">
      <Grid item sm={2} md={2}>
        <TextField required onChange={updateFlowerName} size="small" value={name}></TextField>
      </Grid>
      <Grid item sm={2} md={2}>
        <TextField
          required
          onChange={updateFlowerPrice}
          size="small"
          value={price}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          inputProps={{
            pattern: "^\\d+(\\.\\d+)?$",
          }}
        ></TextField>
      </Grid>
      <Grid item sm={2} md={2}>
        <TextField required onChange={updateFlowerCount} size="small" type="number" value={count}></TextField>
      </Grid>
      <Grid item sm={2} md={2}>
        <Typography>{`$ ${flower.pricePerStem}`}</Typography>
      </Grid>
      {status === "failed" && (
        <Grid item sm={1} md={1}>
          <Typography>Failed!</Typography>
        </Grid>
      )}
      {status === "loading" && (
        <Grid item sm={1} md={1}>
          <Typography>Saving...</Typography>
        </Grid>
      )}
      {hasUpdates && status !== "loading" && (
        <Grid item sm={1} md={1}>
          <IconButton onClick={onSave}>
            <SaveIcon color="success" />
          </IconButton>
          <IconButton onClick={onUndo}>
            <UndoIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  )
}

export default FlowerInputs
