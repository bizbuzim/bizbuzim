import React from "react";
import { Drawer } from "@mui/material";

import { SavedFilterData, SavedFilter } from "./saved";

export const SideDrawer: React.FC<{
  onClose(): void;
  open: boolean;
  onSelected(id: string): void;
  onDeleted(id: string): void;
  filters: SavedFilterData[];
}> = ({ onClose, open, filters, onSelected, onDeleted }) => {
  let content = <>Nothing to see here...</>;
  if (filters.length > 0) {
    content = (
      <>
        {filters.map((s: SavedFilterData, i: number) => {
          return (
            <SavedFilter
              key={i}
              onSelected={() => onSelected(s.id)}
              onDeleted={() => onDeleted(s.id)}
              filter={s}
            />
          );
        })}
      </>
    );
  }
  return (
    <Drawer
      sx={{
        "& .MuiPaper-root": {
          width: "30%",
          padding: "20px",
        },
      }}
      anchor="right"
      onClose={onClose}
      open={open}
    >
      {content}
    </Drawer>
  );
};
