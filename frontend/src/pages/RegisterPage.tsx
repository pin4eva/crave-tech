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
import { SIGNUP } from "apollo/queries/auth.query";
import React from "react";
import { useNavigate } from "react-router-dom";

interface LoginPayload {
  email: string;
  password: string;
  name: string;
  password2: string;
}

const RegisterPage = () => {
  const [info, setInfo] = React.useState<LoginPayload>({} as LoginPayload);
  const [signup] = useMutation(SIGNUP);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { password2, ...input } = info;
    if (input.password !== password2) return alert("Passwords must match");
    try {
      setLoading(true);
      const { data } = await signup({ variables: { input } });
      console.log(data);
      navigate("/login");
    } catch (error) {
      alert(error);
      console.log({ error });
    } finally {
      setLoading(false);
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
              <InputLabel>Full Names</InputLabel>
              <OutlinedInput
                onChange={handleChange}
                required
                name="name"
                label="Name"
                type="text"
              />
            </FormControl>
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
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Confirm Password</InputLabel>
              <OutlinedInput
                required
                name="password2"
                label="Password"
                type="password"
                onChange={handleChange}
              />
            </FormControl>
            <Button
              disabled={loading}
              fullWidth
              variant="contained"
              type="submit"
            >
              {loading ? "Processing..." : "Register"}
            </Button>
          </form>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default RegisterPage;

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
