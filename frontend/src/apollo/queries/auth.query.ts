import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      id
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($input: SignupInput) {
    signup(input: $input) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_ME = gql`
  {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;
