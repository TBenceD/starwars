type getAllFilmOfCharacterProps = {
  filmUrls: string[];
};

export default async function getAllFilmOfCharacter(
  props: getAllFilmOfCharacterProps
): Promise<string[]> {
  const { filmUrls } = props;

  let films = [];
  try {
    const filmRequest = filmUrls.map(async (filmUrl) =>
      fetch(`${filmUrl}`)
        .then((res) => res.json())
        .catch((err) => console.log(err))
    );
    films = await Promise.all(filmRequest);
  } catch (error) {
    console.error("Hiba a filmek betöltése közben:", error);
    return [];
  }

  return films[0].title;
}
