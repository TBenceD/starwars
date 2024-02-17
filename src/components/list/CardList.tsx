"use client";

import getAllCharacter from "@/api/getAllCharacter";
import { QueryKeys } from "@/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { CharacterEntity } from "@/entity";
import LoadingCard from "../card/LoadingCard";
import Button from "../button/Button";
import { useDebounce, useIsScrollable } from "@/utils";
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
    queryKey: [QueryKeys.characterQuery, { search: searchTerm, gender, home }],
    queryFn: ({ pageParam }) =>
      getAllCharacter({ page: pageParam, search: searchTerm, gender, home }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next === null && !loadedAllCharacters) {
        setLoadedAllCharacters(true);
      }
      return lastPage.next !== null ? allPages.length + 1 : null;
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
    setGender(e.target.value);
  };

  const handleHomeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHome(e.target.value);
  };

  useEffect(() => {
    const handleScroll = async () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const indicatorBottom = scrollTop + clientHeight;

      // Calculate 5% from the bottom of the scrollbar
      const fivePercentFromBottom = scrollHeight * 0.95;

      // Check if the indicator bottom is approximately 5% from the bottom
      const isFivePercentFromBottom = indicatorBottom >= fivePercentFromBottom;

      if (
        !loadedAllCharacters &&
        isFivePercentFromBottom &&
        !characters.isLoading &&
        !characters.isFetching
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [characters]);

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
                characters.data.pages.map((page) =>
                  page.results?.map((character: CharacterEntity) => (
                    <Card
                      key={character.name}
                      character={character}
                      onClick={handleModalVisible}
                    />
                  ))
                )}
              {characters.isFetching && <LoadingCard />}
            </>
          )}
        </div>
      </div>
      {!useIsScrollable({ dependencies: [gender, searchTerm] }) &&
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
