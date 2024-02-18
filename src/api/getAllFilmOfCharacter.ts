type getAllFilmOfCharacterProps = {
  filmUrl: string;
};

export default async function getAllFilmOfCharacter(
  props: getAllFilmOfCharacterProps
): Promise<string> {
  const { filmUrl } = props;

  try {
    const film = await fetch(`${filmUrl}`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return film.title;
  } catch (error) {
    console.error("Hiba a filmek betöltése közben:", error);
    return "";
  }
}
