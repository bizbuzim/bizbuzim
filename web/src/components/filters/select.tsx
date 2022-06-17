import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { OutlinedInput, FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const BZSelect: React.FC<{
  items: string[];
  title: string;
  initial: string[];
  onItemSelected: (item: string[]) => void;
}> = ({ items, title, onItemSelected, initial }) => {
  const [selected, setSelected] = useState<string[]>(initial);
  return (
    <>
      <FormControl sx={{ width: 300 }}>
        <InputLabel>{title}</InputLabel>
        <Select
          multiple
          value={selected}
          style={{
            minWidth: "8rem",
          }}
          onChange={(event: SelectChangeEvent<string[]>) => {
            const { value } = event.target;
            const r = typeof value === "string" ? value.split(",") : value;
            onItemSelected(r);
            setSelected(r);
          }}
          input={<OutlinedInput label={title} />}
          renderValue={(selected: string[]) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: string) => {
                return <Chip key={value} label={value} />;
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item, i) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
