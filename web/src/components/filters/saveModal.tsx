import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Button, Box, Input, Typography, Modal } from "@mui/material";
import _ from "lodash";

import { FiltersContext } from "../../context/filters";

const FilterModalContentContainer = styled(Typography)`
  display: flex;
  flex-direction: column;
`;
const Text = styled.div``;
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const FilterModalContent: React.FC<{
  open: boolean;
  onClose(name: string): void;
  close(): void;
}> = ({ open, close, onClose }) => {
  const {
    dates: { from, to },
    payments,
    search,
    tags,
  } = useContext(FiltersContext);
  const [name, setName] = useState("");
  if (!open) {
    return <></>;
  }
  const fromDate = <Text>From: {from.toFormat("yyyy LLL dd")}</Text>;
  const toDate = <Text>To: {to.toFormat("yyyy LLL dd")}</Text>;
  let paymentsList = <></>;
  if (payments.length > 0) {
    const list = _.map(payments || [], (p) => {
      return <>{p}</>;
    });
    paymentsList = <Text>Payments: {list}</Text>;
  }
  let tagsList = <></>;
  if (tags.length > 0) {
    const list = _.map(tags, (t) => {
      return <>{t}</>;
    });
    tagsList = <Text>Tags: {list}</Text>;
  }
  let searchFilter = <></>;
  if (search) {
    searchFilter = <Text>Search: {search}</Text>;
  }
  return (
    <Modal
      open={open}
      onClose={() => {
        close();
      }}
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Give your filter a name:
          <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
        </Typography>
        <FilterModalContentContainer sx={{ mt: 2 }}>
          <Text>Details</Text>
          {searchFilter}
          {fromDate}
          {toDate}
          {paymentsList}
          {tagsList}
          <Button
            onClick={() => {
              onClose(name);
              close();
            }}
          >
            Save Filter
          </Button>
        </FilterModalContentContainer>
      </Box>
    </Modal>
  );
};
