import styled from "@emotion/styled";
import { Container } from "@mui/material";
import HeaderComp from "components/HeaderComp";
import NoteContextProvider from "context/note.context";
import React from "react";

const FrontLayout: React.FC = ({ children }) => {
  return (
    <NoteContextProvider>
      <Wrapper>
        <HeaderComp />
        <Container>{children}</Container>
      </Wrapper>
    </NoteContextProvider>
  );
};

export default FrontLayout;

const Wrapper = styled.div``;
