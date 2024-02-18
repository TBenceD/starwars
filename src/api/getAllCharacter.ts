import { CharacterPageEntity } from "@/entity";
import getAllFilmOfCharacter from "./getAllFilmOfCharacter";
import getHomeOfCharacter from "./getCharacterHomeWorld";

type getAllCharactersProps = {
  page: number;
  search: string;
};

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

const existingFilms: [{ name: string; value: string }] = [
  { name: "", value: "" },
];

const existingHomeWorld: [{ name: string; value: string }] = [
  { name: "", value: "" },
];

export default async function getAllCharacter(
  props: getAllCharactersProps
): Promise<CharacterPageEntity> {
  const { page, search } = props;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    search,
  });

  const homeWorldNames: { label: string; value: string }[] = [];

  let fetchData = await fetch(`${url}/people?${queryParams.toString()}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const filteringResults = [];

  for (const character of fetchData.results) {
    const characterFilms: string[] = [];

    for (const film of character.films) {
      const included = existingFilms.find(
        (existingFilm) => existingFilm.name === film
      );
      if (included) {
        characterFilms.push(included.value);
      } else {
        const value = await getAllFilmOfCharacter({ filmUrl: film });
        characterFilms.push(value);
        existingFilms.push({ name: film, value: value });
      }
    }

    const includedHomeWorld = existingHomeWorld.find(
      (existingHomeWorld) => existingHomeWorld.name === character.homeworld
    );

    let homeworld = "";
    if (includedHomeWorld) {
      homeworld = includedHomeWorld.value;
    } else {
      homeworld = await getHomeOfCharacter({
        home: character.homeworld,
      });
      existingHomeWorld.push({ name: character.homeworld, value: homeworld });
    }

    homeWorldNames.push({ label: homeworld, value: homeworld });
    filteringResults.push({
      ...character,
      films: characterFilms,
      homeworld,
    });
  }

  fetchData = { ...fetchData, results: filteringResults, homeWorldNames };

  return fetchData;
}
