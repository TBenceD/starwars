import { CharacterEntity, CharacterPageEntity } from "@/entity";
import getAllFilmOfCharacter from "./getAllFilmOfCharacter";
import getHomeOfCharacter from "./getCharacterHomeWorld";

type getAllCharactersProps = {
  page: number;
  search: string;
  gender: string | undefined;
  home: string | undefined;
};

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function getAllCharacter(
  props: getAllCharactersProps
): Promise<CharacterPageEntity> {
  const { page, search, gender, home } = props;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    search,
  });

  const homeWorldNames: { label: string; value: string }[] = [];

  let fetchData = await fetch(`${url}/people?${queryParams.toString()}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const filteringResults = await Promise.all(
    fetchData.results.map(async (character: CharacterEntity) => {
      const films = await Promise.all(
        character.films.map((filmUrl: string) =>
          getAllFilmOfCharacter({ filmUrls: [filmUrl] })
        )
      );

      const homeworld = await getHomeOfCharacter({
        home: character.homeworld,
      });

      homeWorldNames.push({ label: homeworld, value: homeworld });

      return {
        ...character,
        films,
        homeworld,
      };
    })
  );

  fetchData = { ...fetchData, results: filteringResults, homeWorldNames };

  if (home && gender) {
    const filteredResults = fetchData.results.filter(
      (character: CharacterEntity) =>
        character.homeworld.toLowerCase() === home.toLowerCase() &&
        character.gender.toLowerCase() === gender.toLowerCase()
    );

    return { ...fetchData, results: filteredResults };
  }

  if (home) {
    const filteredResults = fetchData.results.filter(
      (character: CharacterEntity) => {
        console.log(home);
        console.log(character.homeworld.toLowerCase());
        return character.homeworld.toLowerCase() === home.toLowerCase();
      }
    );

    return { ...fetchData, results: filteredResults };
  }

  if (gender) {
    const filteredResults = fetchData.results.filter(
      (character: CharacterEntity) =>
        character.gender.toLowerCase() === gender.toLowerCase()
    );

    return { ...fetchData, results: filteredResults };
  }

  return fetchData;
}
