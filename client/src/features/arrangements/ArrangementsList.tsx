import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { Arrangement } from "../../types/Types";
import { Link } from "react-router-dom";

interface ArrangementsListProps {
  arrangements: Arrangement[];
}

const ArrangementsList: React.FC<ArrangementsListProps> = ({ arrangements }) => {
  return (
    <List>
      {arrangements.map((a) => (
        <ListItem key={a.id} disablePadding>
          <Link to={`/arrangements/${a.id}`}>
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
