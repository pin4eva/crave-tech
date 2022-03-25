import { Button, Container, Stack } from "@mui/material";
import { useAppContext } from "context/app.context";
import React from "react";

const HeaderComp = () => {
  const { logout } = useAppContext();
  return (
    <header>
      <nav>
        <Container>
          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={logout}>Logout</Button>
          </Stack>
        </Container>
      </nav>
    </header>
  );
};

export default HeaderComp;
