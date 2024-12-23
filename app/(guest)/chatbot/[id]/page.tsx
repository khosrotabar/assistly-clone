"use client";

import { FormEvent, use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { startNewChat } from "@/lib/startNewChat";
import Avatar from "@/components/Avatar";
import { useQuery } from "@apollo/client";
import {
  GetChatbotByIdResponse,
  Message,
  MessagesByChatSessionIdResponse,
  MessagesByChatSessionIdVariables,
} from "@/types/types";
import {
  GET_CHATBOT_BY_ID,
  GET_MESSAGES_BY_CHAT_SESSION_ID,
} from "@/graphql/queries/queries";
import Messages from "@/components/Messages";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  message: z.string().min(2, "Your Message is too short"),
});

function ChatbotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsopen] = useState(true);
  const [chatId, setChatId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const { data: chatBotData } = useQuery<GetChatbotByIdResponse>(
    GET_CHATBOT_BY_ID,
    {
      variables: { id },
    }
  );

  const {
    data,
    loading: loadingQuery,
    error,
  } = useQuery<
    MessagesByChatSessionIdResponse,
    MessagesByChatSessionIdVariables
  >(GET_MESSAGES_BY_CHAT_SESSION_ID, {
    variables: {
      chat_session_id: chatId,
    },
    skip: !chatId,
  });

  useEffect(() => {
    if (data) {
      setMessages(data.chat_sessions.messages);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const chatId = await startNewChat(name, email, Number(id));

    setChatId(chatId);
    setLoading(false);
    setIsopen(false);
  };

  return (
    <div className="w-full bg-gray-100 flex">
      <Dialog open={isOpen} onOpenChange={setIsopen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Lets help you out!</DialogTitle>
              <DialogDescription>
                I just need a few details to get started.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-4">
              <Label htmlFor="name" className="text-right w-[50px]">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Dou"
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label htmlFor="email" className="text-right w-[50px]">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full"
              />
            </div>

            <div className="w-full flex justify-end">
              <Button
                size="sm"
                className="w-fit"
                type="submit"
                disabled={!name || !email || loading}
              >
                {!loading ? "Continue" : "Loading..."}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col w-full max-w-3xl mx-auto bg-white md:rounded-t-lg shadow-2xl md:mt-10">
        <div
          className="pb-4 border-b sticky top-0 z-50 bg-[#4D7DFB] py-5
        px-10 text-white md:rounded-t-lg flex items-center space-x-4"
        >
          <Avatar
            seed={chatBotData?.chatbots.name ?? ""}
            className="h-12 w-12 bg-white rounded-full border-2 border-white"
          />
          <div>
            <h1 className="truncate text-lg">{chatBotData?.chatbots.name}</h1>
            <p className="text-sm text-gray-300">
              ⚡️ Typically replies Instantly
            </p>
          </div>
        </div>

        <Messages
          messages={messages}
          chatbotName={chatBotData?.chatbots.name ?? ""}
        />
      </div>
    </div>
  );
}

export default ChatbotPage;
