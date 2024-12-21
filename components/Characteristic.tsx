"use client";

import { REMOVE_CHARACTERISTIC } from "@/graphql/mutations/mutations";
import { ChatbotCharacteristic } from "@/types/types";
import { useMutation } from "@apollo/client";
import { OctagonX } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function Characteristic({
  characteristic,
}: {
  characteristic: ChatbotCharacteristic;
}) {
  const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
    refetchQueries: ["GetChatbotById"],
  });

  const handleRemoveCharacteristic = async () => {
    try {
      await removeCharacteristic({
        variables: {
          id: characteristic.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="relative p-10 bg-white border rounded-md">
      {characteristic.content}

      <OctagonX
        className="w-5 h-5 text-white stroke-red-500 absolute top-1 right-1
        cursor-pointer hover:opacity-50"
        onClick={() => {
          const promise = handleRemoveCharacteristic();
          toast.promise(promise, {
            loading: "Removing...",
            success: "Characteristic removed",
            error: "Failed to remove characteristic",
          });
        }}
      />
    </li>
  );
}

export default Characteristic;
