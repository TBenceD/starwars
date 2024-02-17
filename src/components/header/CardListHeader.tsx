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
    <div className="pt-8 w-full flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-7 md:gap-2">
      <div className="md:col-span-3 md:col-start-2">
        <SearchBar
          id="search"
          value={searchText}
          onChange={handleSearchTermChange}
          maxLength={255}
          placeholder="Kezdj el keresni.."
        />
      </div>
      <div className="md:col-span-1">
        <Filter
          id="gender-filter"
          name="gender"
          options={AllGenderType}
          onChange={handleGenderChange}
          currentValue={gender}
          placeholder="Nem"
        />
      </div>
      <div className="md:col-span-1">
        <Filter
          id="gender-filter"
          name="gender"
          options={uniqueNamesArray}
          onChange={handleHomeChange}
          currentValue={home}
          placeholder="Szülőföld"
        />
      </div>
    </div>
  );
}
