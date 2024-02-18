type getAllFilmOfCharacterProps = {
  filmUrls: string;
};

export default async function getAllFilmOfCharacter(
  props: getAllFilmOfCharacterProps
): Promise<string> {
  const { filmUrls } = props;

  try {
    const film = await fetch(`${filmUrls}`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return film.title;
  } catch (error) {
    console.error("Hiba a filmek betöltése közben:", error);
    return "";
  }
}
