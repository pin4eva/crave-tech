import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation CreateNote($input: NoteInput) {
    createNote(input: $input) {
      id
      title
      items {
        id
      }
    }
  }
`;

export const GET_NOTES = gql`
  {
    getNotes {
      id
      title
      author {
        id
      }
      items {
        complected
        id
        title
      }
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export const CREATE_NOTE_LIST = gql`
  mutation CreateNoteList($input: NoteListInput) {
    createNoteList(input: $input) {
      id
      title
      complected
      note {
        id
      }
    }
  }
`;

export const GET_NOTE_LISTS = gql`
  {
    getNoteLists {
      id
      complected
      title
    }
  }
`;

export const CHECK_COMPLECTED = gql`
  mutation ($id: ID) {
    markComplected(id: $id)
  }
`;
