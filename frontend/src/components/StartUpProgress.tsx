import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useNoteContext } from "context/note.context";
import React from "react";
import NoteComp from "./NoteListItem";

const StartUpProgress = () => {
  const { notes } = useNoteContext();
  return (
    <Wrapper>
      <Typography component="h1" variant="h5" fontWeight={600} mb={3}>
        My startup progress
      </Typography>

      {notes?.map((note, i) => (
        <NoteComp initalNote={note} key={i} index={i} />
      ))}
    </Wrapper>
  );
};

export default StartUpProgress;

const Wrapper = styled.div``;
