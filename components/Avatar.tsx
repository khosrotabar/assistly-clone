import React from "react";
import { createAvatar } from "@dicebear/core";
import { rings } from "@dicebear/collection";
import Image from "next/image";

type Props = {
  seed: string;
  className?: string;
};

function Avatar({ seed, className }: Props) {
  const avatar = createAvatar(rings, {
    seed: seed,
    // ... other options
  });

  const svg = avatar.toString();

  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
    "base64"
  )}`;

  return (
    <Image
      src={dataUri}
      alt="User Avatar"
      width={100}
      height={100}
      className={className}
    />
  );
}

export default Avatar;
