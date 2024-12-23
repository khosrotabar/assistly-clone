"use client";

import { use } from "react";

function ChatbotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <div>ChatbotPage {id}</div>;
}

export default ChatbotPage;
