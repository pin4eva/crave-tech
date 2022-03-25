import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Check } from "@mui/icons-material";
import { Checkbox, Typography } from "@mui/material";
import { CHECK_COMPLECTED } from "apollo/queries/note.query";
import { INote, INoteItem } from "interface/note.interface";
import React, { useMemo, useState } from "react";
import { CreateNoteListComp } from "./CreateNote";

const NoteComp: React.FC<{ initalNote: INote; index: number }> = ({
  initalNote,
  index,
}) => {
  const [note] = useState<INote>(initalNote);
  const [items, setItems] = React.useState<INoteItem[]>(
    initalNote?.items || []
  );

  const onCheckedItem = (payload: INoteItem) => {
    setItems(
      items.map((item) =>
        item.id === payload.id
          ? { ...item, complected: payload.complected }
          : item
      )
    );
  };
  const complected = useMemo(() => {
    const itemLength = items?.length;
    const complectedItems = items?.filter((item) => item.complected);

    return itemLength > 0 && itemLength === complectedItems.length;
  }, [items]);

  return (
    <Wrapper className="list">
      <div className="list-heading">
        <div className="list-heading-inner">
          <div className="list-heading_num">{index + 1}</div>
          <Typography variant="h6" mr={2}>
            {note?.title}
          </Typography>
          {complected && <Check color="success" />}
        </div>
      </div>
      <ul>
        {items?.map((item, i) => (
          <li key={i}>
            <NoteListItem checkItem={onCheckedItem} item={item} />
          </li>
        ))}
      </ul>
      <CreateNoteListComp
        addListItem={(data) => setItems([...items, data])}
        note={note.id}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
  .list {
    &-heading {
      display: flex;
      align-items: center;
      &-inner {
        display: flex;
        align-items: center;
      }
      &_num {
        background-color: #272727;
        width: 2rem;
        height: 2rem;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        margin-right: 1rem;
      }
    }
  }
  ul {
    list-style: none;
    padding-left: 0;
    li {
      .note-item {
        display: flex;
        align-items: center;
      }
    }
  }
`;

const NoteListItem: React.FC<{
  item: INoteItem;
  checkItem: (payload: INoteItem) => void;
}> = ({ item, checkItem }) => {
  const [checked, setChecked] = React.useState(item?.complected);
  const [markComplected] = useMutation(CHECK_COMPLECTED);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    checkItem({ ...item, complected: event.target.checked });
    await markComplected({ variables: { id: item.id } });
  };
  return (
    <div className="note-item">
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography>{item?.title}</Typography>
    </div>
  );
};

export default NoteComp;
