import { Button, Divider, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import FlowersList from "./FlowersList";
import Search from "@mui/icons-material/Search";
import { debounce } from "lodash";

interface FlowersContainerProps {}

const FlowersContainer: React.FC<FlowersContainerProps> = () => {
  const flowers = useSelector((state: RootState) => state.flowers.value);
  const status = useSelector((state: RootState) => state.flowers.status);

  const [filteredFlowers, setFilteredFlowers] = useState(flowers);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!filter) {
      setFilteredFlowers(flowers);
    } else {
      setFilteredFlowers(flowers.filter((f) => f.name.toLowerCase().includes(filter.toLowerCase())));
    }
  }, [filter, flowers]);

  const onFilterChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const filter = e.target.value;
    setFilter(filter);
  };

  const onCreate = () => {
    setFilteredFlowers([{ id: -1, name: "", pricePerBundle: 0, pricePerStem: 0, stemCount: 0 }, ...filteredFlowers]);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Failed!</div>;
  }
  return (
    <>
      <Grid container>
        <Grid item xs={2} sm={3} onClick={onCreate}>
          <Button variant="contained" color="primary">
            Add Flower
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            onChange={debounce(onFilterChanged, 350)}
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
            label="Search"
          ></TextField>
        </Grid>
      </Grid>
      <Divider style={{ margin: 16 }} />
      <Grid container spacing={1}>
        <Grid item sm={3} xs={3}>
          <Typography variant="button">name</Typography>
        </Grid>
        <Grid item sm={3} xs={3}>
          <Typography variant="button">price per bundle</Typography>
        </Grid>
        <Grid item sm={2} xs={2}>
          <Typography variant="button">stems</Typography>
        </Grid>
        <Grid item sm={3} xs={2}>
          <Typography variant="button">price per stem</Typography>
        </Grid>
      </Grid>
      <FlowersList flowers={filteredFlowers} />
    </>
  );
};

export default FlowersContainer;
