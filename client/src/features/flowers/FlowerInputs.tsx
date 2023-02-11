import { Grid, IconButton, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Flower } from "../../types/Types"
import SaveIcon from "@mui/icons-material/Done"
import UndoIcon from "@mui/icons-material/Undo"
import { useAppDispatch } from "../../app/hooks"
import { updateFlowerAsync } from "./flowersSlice"
import cloneDeep from "lodash.clonedeep"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

interface FlowerInputsProps {
  flower: Flower
}

const FlowerInputs: React.FC<FlowerInputsProps> = ({ flower }) => {
  const flowerStatus = useSelector((state: RootState) => state.flowers.status)
  const [hasUpdates, setHasUpdates] = useState(false)
  const [name, setName] = useState(flower.name)
  const dispatch = useAppDispatch()

  const updateFlowerName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setHasUpdates(true)
    const v = e.target.value
    setName(v)
  }

  useEffect(() => {
    setHasUpdates(false)
  }, [flower])

  const onSave = () => {
    dispatch(updateFlowerAsync({ ...cloneDeep(flower), name: name }))
  }

  const onUndo = () => {
    setName(flower.name)
    setHasUpdates(false)
  }

  return (
    <Grid container item spacing={2}>
      <Grid item sm={2} md={2}>
        <TextField onChange={updateFlowerName} size="small" value={name}></TextField>
      </Grid>
      <Grid item sm={2} md={2}>
        <TextField size="small" value={flower.pricePerBundle}></TextField>
      </Grid>
      <Grid item sm={2} md={2}>
        <TextField size="small" value={flower.stemCount}></TextField>
      </Grid>
      <Grid item sm={2} md={2}>
        <TextField size="small" value={flower.pricePerStem}></TextField>
      </Grid>
      {hasUpdates && (
        <>
          <Grid item sm={1} md={1}>
            <IconButton onClick={onSave}>
              <SaveIcon color="success" />
            </IconButton>
            <IconButton onClick={onUndo}>
              <UndoIcon />
            </IconButton>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default FlowerInputs
