"use client";

import getAllCharacter from "@/api/getAllCharacter";
import { QueryKeys } from "@/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Card from "../card/Card";
import { CharacterEntity } from "@/entity";
import LoadingCard from "../card/LoadingCard";
import Button from "../button/Button";
import {
  useDebounce,
  useIsScrollable,
  useTriggerInfiniteScrolling,
} from "@/utils";
import CardListHeader from "../header/CardListHeader";

type CardListProps = {
  handleModalVisible: (character: CharacterEntity) => void;
};

export default function CardList(props: CardListProps) {
  const { handleModalVisible } = props;
  const [loadedAllCharacters, setLoadedAllCharacters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchText, setSearchText] = useState("");
  const [gender, setGender] = useState("");
  const [home, setHome] = useState("");

  const characters = useInfiniteQuery({
    queryKey: [QueryKeys.characterQuery, { search: searchTerm }],
    queryFn: ({ pageParam }) =>
      getAllCharacter({ page: pageParam, search: searchTerm }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next === null && !loadedAllCharacters) {
        setLoadedAllCharacters(true);
        return null;
      }
      return gender || home ? null : allPages.length + 1;
    },
  });

  const handleLoadMore = async () => {
    await characters.fetchNextPage();
  };

  const handleSearch = useDebounce((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, 250);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    handleSearch(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoadedAllCharacters(false);
    setGender(e.target.value);
  };

  const handleHomeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoadedAllCharacters(false);
    setHome(e.target.value);
  };

  useTriggerInfiniteScrolling({
    triggeringFunction: handleLoadMore,
    loadedAll: loadedAllCharacters,
    isLoaded: !characters.isLoading && !characters.isFetching,
    dependencies: [characters, loadedAllCharacters],
  });

  return (
    <div>
      <CardListHeader
        gender={gender}
        searchText={searchText}
        handleSearchTermChange={handleSearchTermChange}
        handleGenderChange={handleGenderChange}
        pages={characters.data?.pages}
        handleHomeChange={handleHomeChange}
        home={home}
      />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          {characters.isFetching && !characters.data?.pages ? (
            <LoadingCard />
          ) : (
            <>
              {characters.data &&
                characters.data.pages.map((page) => {
                  const filteredCharacters = page.results?.filter(
                    (character: CharacterEntity) =>
                      gender && home
                        ? character.gender.toLowerCase() ===
                            gender.toLowerCase() &&
                          character.homeworld.toLowerCase() ===
                            home.toLowerCase()
                        : gender
                        ? character.gender.toLowerCase() ===
                          gender.toLowerCase()
                        : home
                        ? character.homeworld.toLowerCase() ===
                          home.toLowerCase()
                        : true
                  );

                  return filteredCharacters?.map(
                    (character: CharacterEntity) => (
                      <Card
                        key={character.name}
                        character={character}
                        onClick={handleModalVisible}
                      />
                    )
                  );
                })}
              {characters.isFetching && <LoadingCard />}
            </>
          )}
        </div>
      </div>
      {!useIsScrollable({ dependencies: [gender, searchTerm, home] }) &&
        !gender &&
        !home &&
        !loadedAllCharacters &&
        !characters.isFetching &&
        !characters.isLoading && (
          <div className="flex justify-center pt-8">
            <Button
              name="Több betöltése"
              type="button"
              onClick={handleLoadMore}
            />
          </div>
        )}
    </div>
  );
}
