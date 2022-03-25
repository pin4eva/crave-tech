/* eslint-disable react/no-unescaped-entities */
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { LOGIN } from "apollo/queries/auth.query";
import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import { TOKEN_NAME, USER_ID } from "utils/constants";

interface LoginPayload {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [info, setInfo] = React.useState<LoginPayload>({} as LoginPayload);
  const [login, { loading }] = useMutation(LOGIN, {
    // fetchPolicy: "network-only",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { ...info } });
      Cookies.set(TOKEN_NAME, data.login.token);
      Cookies.set(USER_ID, data.login.id);
      window.location.href = "/";
    } catch (error) {
      alert(error);
      console.log({ error });
      throw error;
    }
  };
  return (
    <Wrapper>
      <Container>
        <Box className="inner">
          <Typography
            component="h1"
            variant="h2"
            fontWeight={600}
            align="center"
            mb={3}
          >
            Crave Tech
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                onChange={handleChange}
                required
                name="email"
                label="email"
                type="email"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                required
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
              />
            </FormControl>
            <Button
              fullWidth
              disabled={loading}
              variant="contained"
              type="submit"
            >
              {loading ? "Processing..." : "Login"}
            </Button>
          </form>
          <Typography align="center" mt={2}>
            Don't have an account? <Link to="/register"> Register</Link>
          </Typography>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .inner {
    height: 70vh;
    width: 100%;
    max-width: 600px;
    margin: auto;
  }
`;
