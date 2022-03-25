import { useQuery } from "@apollo/client";
import { GET_NOTES } from "apollo/queries/note.query";
import { INote, INoteItem } from "interface/note.interface";
import React, { createContext, useContext } from "react";

interface NoteContextProps {
  notes: INote[];
  addNote: (note: INote) => void;
  addListItem: (list: INoteItem) => void;
  checkItem: (payload: { id: string; checked: boolean }) => void;
}

const NoteContext = createContext<NoteContextProps>({} as NoteContextProps);

export const useNoteContext = () => useContext(NoteContext);

const NoteContextProvider: React.FC = ({ children }) => {
  const [notes, setNotes] = React.useState<INote[]>([]);

  useQuery(GET_NOTES, {
    onCompleted: (data) => setNotes(data.getNotes),
    onError: (error) => console.log(error),
  });

  const addNote = (payload: INote) => {
    setNotes([...notes, payload]);
  };

  const checkItem = (payload: { id: string; checked: boolean }) => {
    const mappedNotes = notes.map((note) => ({
      ...note,
      items: note.items.map((item) =>
        item.id === payload.id ? { ...item, complected: payload.checked } : item
      ),
    }));
    setNotes(mappedNotes);
  };

  const addListItem = (payload: INoteItem) => {
    setNotes(
      notes.map((note) =>
        note.id === payload.note.id
          ? { ...note, items: [...note.items, payload] }
          : note
      ) as INote[]
    );
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, addListItem, checkItem }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
