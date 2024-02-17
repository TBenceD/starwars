import React from "react";
import Modal from "./Modal";
import { CharacterEntity } from "@/entity";

type CharacterModalProps = {
  character: CharacterEntity;
  handleCloseModal: () => void;
};

export default function CharacterModal(props: CharacterModalProps) {
  const { character, handleCloseModal } = props;

  return (
    <Modal title={character.name} handleCloseModal={handleCloseModal}>
      <div className="w-full space-y-4">
        <div>
          <label
            htmlFor="height"
            className="text-base text-slate-300 font-semibold"
          >
            Magasság
          </label>
          <p id="height" className="text-slate-400">
            {character.height}
          </p>
        </div>
        <div>
          <label
            htmlFor="mass"
            className="text-base text-slate-300 font-semibold"
          >
            Súly
          </label>
          <p id="mass" className="text-slate-400">
            {character.mass}
          </p>
        </div>

        <div>
          <label
            htmlFor="films"
            className="text-base text-slate-300 font-semibold"
          >
            Filmek
          </label>
          <div id="films" className="text-slate-400">
            {character.films?.map((film: string, index: number) => (
              <ul key={index} className="text-slate-400">
                <li>{film}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
