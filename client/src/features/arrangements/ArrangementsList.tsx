import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { Arrangement } from "../../types/Types";
import { Link } from "react-router-dom";

interface ArrangementsListProps {
  arrangements: Arrangement[];
}

const ArrangementsList: React.FC<ArrangementsListProps> = ({ arrangements }) => {
  return (
    <List disablePadding>
      {arrangements.map((a) => (
        <ListItem key={a.id}>
          <Link to={`/arrangements/${a.id}`} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
            <ListItemButton>
              <ListItemText primary={a.name} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default ArrangementsList;
