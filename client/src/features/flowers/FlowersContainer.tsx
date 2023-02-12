import { Grid, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
import FlowersList from "./FlowersList"
import { getFlowersAsync } from "./flowersSlice"

interface FlowersContainerProps {}

const FlowersContainer: React.FC<FlowersContainerProps> = () => {
  const flowers = useSelector((state: RootState) => state.flowers.value)
  const status = useSelector((state: RootState) => state.flowers.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getFlowersAsync())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === "loading") {
    return <div>Loading...</div>
  } else if (status === "failed") {
    return <div>Failed!</div>
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={2} md={2}>
          <Typography variant="button">name</Typography>
        </Grid>
        <Grid item sm={2} md={2}>
          <Typography variant="button">price per bundle</Typography>
        </Grid>
        <Grid item sm={2} md={2}>
          <Typography variant="button">stems</Typography>
        </Grid>
        <Grid item sm={2} md={2}>
          <Typography variant="button">price per stem</Typography>
        </Grid>
      </Grid>
      <FlowersList flowers={flowers} />
    </>
  )
}

export default FlowersContainer