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
      className="h-64 hover:skew-y-2 cursor-pointer border p-4 border-neutral-950 shadow-lg shadow-sky-900 w-96 max-w-full rounded-lg"
    >
      <div className="flex justify-center">
        <img
          src={`${
            character.url.match(/\/(\d+)\/$/)
              ? `https://starwars-visualguide.com/assets/img/characters/${
                  character.url.match(/\/(\d+)\/$/)![1]
                }.jpg`
              : "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk="
          }`}
          className="rounded-lg bg-slate-700 h-48"
        />
      </div>
      <div className="flex-1 space-y-3 pt-2">{character.name}</div>
    </div>
  );
}
