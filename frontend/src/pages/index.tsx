/* eslint-disable react/no-unescaped-entities */
import styled from "@emotion/styled";
import { Add } from "@mui/icons-material";
import { Box, Fab, Typography } from "@mui/material";
import CreateNoteComp from "components/CreateNote";
import StartUpProgress from "components/StartUpProgress";
import { useAppContext } from "context/app.context";
import { useNoteContext } from "context/note.context";
import React, { useRef } from "react";

const HomePage = () => {
  const { user } = useAppContext();
  const { notes } = useNoteContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openAdd, setOpenAdd] = React.useState(false);
  return (
    <Wrapper>
      <div className="inner">
        <Typography component="h1" variant="h5" mb={4}>
          Welcome {user?.firstName}!,
        </Typography>

        {!notes.length ? (
          <div className="empty-state">
            <Typography>
              You have no plans for your startup!, start by adding a plan.
              <button
                style={{
                  all: "unset",
                  cursor: "pointer",
                  marginLeft: "4px",
                  color: "blue",
                }}
                onClick={() => buttonRef.current?.click()}
              >
                Add one now
              </button>
            </Typography>
          </div>
        ) : (
          <div className="startup">
            <StartUpProgress />
          </div>
        )}

        {openAdd && (
          <Box mt={2}>
            <CreateNoteComp onAdd={() => setOpenAdd(false)} />
          </Box>
        )}
        <Box
          className="flbutton"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Fab
            color="primary"
            aria-label="add"
            ref={buttonRef}
            onClick={() => setOpenAdd(true)}
          >
            <Add />
          </Fab>
        </Box>
      </div>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  min-height: 100vh;
  .inner {
    width: 100%;
    max-width: 600px;
    margin: auto;
    margin-top: 1rem;
    min-height: inherit;
    position: relative;
    .startup {
      margin-top: 1rem;
    }
    .flbutton {
      position: absolute;
      bottom: 10%;
      right: 0;
    }
  }
`;
