"use client";

import CardList from "@/components/list/CardList";
import CharacterModal from "@/components/modal/CharacterModal";
import { CharacterEntity } from "@/entity";
import { useState } from "react";

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterEntity>();
  const handleModalVisible = (character: CharacterEntity) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(undefined);
  };
  return (
    <main className="flex min-h-screen flex-col p-24">
      <CardList handleModalVisible={handleModalVisible} />
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          handleCloseModal={handleCloseModal}
        />
      )}
    </main>
  );
}
