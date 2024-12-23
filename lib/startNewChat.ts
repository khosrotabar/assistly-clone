import client from "@/graphql/apolloClient";
import {
  INSERT_MESSAGE,
  INSERT_GUEST,
  INSERT_CHAT_SESSION,
} from "@/graphql/mutations/mutations";

export async function startNewChat(
  guestName: string,
  guestEmail: string,
  chatbotId: number
) {
  try {
    const createdAt = new Date().toISOString();
    const guestResult = await client.mutate({
      mutation: INSERT_GUEST,
      variables: {
        name: guestName,
        email: guestEmail,
        created_at: createdAt,
      },
    });
    const guestId = guestResult.data.insertGuests.id;

    // Initialize a new chat session
    const chatSessionResult = await client.mutate({
      mutation: INSERT_CHAT_SESSION,
      variables: {
        created_at: createdAt,
        chatbot_id: chatbotId,
        guest_id: guestId,
      },
    });
    const chatSessionId = chatSessionResult.data.insertChat_sessions.id;

    // Insert initial message (optional)
    await client.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        created_at: createdAt,
        sender: "ai",
        content: `Welcome ${guestName}!\n How can i assist you today? 😃`,
        chat_session_id: chatSessionId,
      },
    });

    console.log("New chat session started successfully");
    return chatSessionId;
  } catch (error) {
    console.log("Error starting new chat session: ", error);
  }
}
