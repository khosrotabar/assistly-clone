import { gql } from "@apollo/client";

export const CREATE_CHATBOT = gql`
  mutation CreateChatbot(
    $clerk_user_id: String!
    $name: String!
    $created_at: DateTime!
  ) {
    insertChatbots(
      clerk_user_id: $clerk_user_id
      name: $name
      created_at: $created_at
    ) {
      id
      name
    }
  }
`;

export const REMOVE_CHARACTERISTIC = gql`
  mutation RemoveCharacteristic($id: Int!) {
    deleteChatbot_characteristics(id: $id) {
      id
    }
  }
`;

export const DELETE_CHATBOT = gql`
  mutation DeleteChatbot($id: Int!) {
    deleteChatbots(id: $id) {
      id
    }
  }
`;

export const ADD_CHARACERISTIC = gql`
  mutation AddCharacteristic(
    $content: String!
    $chatbotId: Int!
    $createdAt: DateTime!
  ) {
    insertChatbot_characteristics(
      content: $content
      chatbot_id: $chatbotId
      created_at: $createdAt
    ) {
      id
      content
      created_at
    }
  }
`;

export const UPDATE_CHATBOT = gql`
  mutation UpdateChatbot($id: Int!, $name: String!) {
    updateChatbots(id: $id, name: $name) {
      id
      name
      created_at
    }
  }
`;

export const INSERT_MESSAGE = gql`
  mutation InsertMessage(
    $content: String!
    $created_at: DateTime!
    $sender: String!
    $chat_session_id: Int!
  ) {
    insertMessages(
      content: $content
      created_at: $created_at
      sender: $sender
      chat_session_id: $chat_session_id
    ) {
      id
      content
      created_at
      sender
    }
  }
`;

export const INSERT_CHAT_SESSION = gql`
  mutation InsertChatSession(
    $created_at: DateTime!
    $chatbot_id: Int!
    $guest_id: Int!
  ) {
    insertChat_sessions(
      created_at: $created_at
      chatbot_id: $chatbot_id
      guest_id: $guest_id
    ) {
      id
    }
  }
`;

export const INSERT_GUEST = gql`
  mutation InsertGuest(
    $created_at: DateTime!
    $email: String!
    $name: String!
  ) {
    insertGuests(created_at: $created_at, email: $email, name: $name) {
      id
    }
  }
`;
