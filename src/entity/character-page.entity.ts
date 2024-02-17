import { CharacterEntity } from ".";

export type CharacterPageEntity = {
  count: number;
  next: string;
  previous: string;
  results: CharacterEntity[];
  homeWorldNames: {
    label: string;
    value: string;
  }[];
};
