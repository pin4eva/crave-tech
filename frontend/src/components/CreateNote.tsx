import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { CREATE_NOTE, CREATE_NOTE_LIST } from "apollo/queries/note.query";
import { useNoteContext } from "context/note.context";
import { INoteItem } from "interface/note.interface";
import React, { useState } from "react";

const CreateNoteComp: React.FC<{ onAdd(): void }> = ({ onAdd }) => {
  const [title, setTitle] = React.useState("");
  const [createNote] = useMutation(CREATE_NOTE);
  const { addNote } = useNoteContext();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await createNote({ variables: { input: { title } } });
      addNote(data.createNote);
      setTitle("");
      onAdd();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <InputLabel>Plan</InputLabel>
          <OutlinedInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Plan"
            disabled={loading}
          />
        </FormControl>
      </form>
    </Wrapper>
  );
};

export default CreateNoteComp;

const Wrapper = styled.div``;

export const CreateNoteListComp: React.FC<{
  note: string;
  addListItem: (payload: INoteItem) => void;
}> = ({ note, addListItem }) => {
  const [title, setTitle] = React.useState("");
  const [createNoteList] = useMutation(CREATE_NOTE_LIST);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await createNoteList({
        variables: { input: { title, note } },
      });
      setTitle(" ");
      addListItem({ ...data.createNoteList, note: { id: note } });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <FormControl fullWidth>
        <TextField
          disabled={loading}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="standard"
          placeholder="Add sub item"
        />
      </FormControl>
    </form>
  );
};
