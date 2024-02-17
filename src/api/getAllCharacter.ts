import { CharacterEntity, CharacterPageEntity } from "@/entity";
import getAllFilmOfCharacter from "./getAllFilmOfCharacter";
import getHomeOfCharacter from "./getCharacterHomeWorld";

type getAllCharactersProps = {
  page: number;
  search: string;
};

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

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

  return fetchData;
}
