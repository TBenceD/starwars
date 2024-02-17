import { CharacterEntity } from "@/entity";
import React from "react";

type CartProps = {
  character: CharacterEntity;
  onClick: (character: CharacterEntity) => void;
};

export default function Card(props: CartProps) {
  const { character, onClick } = props;

  return (
    <div
      onClick={() => onClick(character)}
      className="h-64 hover:skew-y-2 cursor-pointer border p-4 border-neutral-950 shadow-lg shadow-sky-900 w-96 rounded-lg"
    >
      {character.name}
    </div>
  );
}
