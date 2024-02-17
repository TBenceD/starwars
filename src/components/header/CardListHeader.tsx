import React from "react";
import SearchBar from "../searchbar/SearchBar";
import Filter from "../filter/Filter";
import { AllGenderType } from "@/common";

type CardListHeaderProps = {
  searchText: string;
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  gender: string;
  handleGenderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  pages: any;
  handleHomeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  home: string;
};

export default function CardListHeader(props: CardListHeaderProps) {
  const {
    searchText,
    handleSearchTermChange,
    gender,
    handleGenderChange,
    pages,
    handleHomeChange,
    home,
  } = props;

  const names = [
    ...(pages?.flatMap((page: any) =>
      page.homeWorldNames.map((name: string) => name)
    ) || []),
  ];

  const uniqueNamesArray = Array.from(
    new Map(names.map((name) => [name.value, name])).values()
  );
  return (
    <div className="pt-8 w-full flex justify-center space-x-4">
      <div className="w-1/2">
        <SearchBar
          id="search"
          value={searchText}
          onChange={handleSearchTermChange}
          maxLength={255}
          placeholder="Kezdj el keresni.."
        />
      </div>
      <div>
        <Filter
          id="gender-filter"
          name="gender"
          options={AllGenderType}
          onChange={handleGenderChange}
          currentValue={gender}
        />
      </div>
      <div>
        <Filter
          id="gender-filter"
          name="gender"
          options={uniqueNamesArray}
          onChange={handleHomeChange}
          currentValue={home}
        />
      </div>
    </div>
  );
}
