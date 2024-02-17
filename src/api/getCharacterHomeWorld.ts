type getHomeOfCharacterProps = {
  home: string;
};

export default async function getHomeOfCharacter(
  props: getHomeOfCharacterProps
): Promise<string> {
  const { home } = props;

  if (home) {
    try {
      const homeWorld = await fetch(`${home}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
      return homeWorld.name;
    } catch (error) {
      console.error("Hiba a filmek betöltése közben:", error);
      return "";
    }
  }
  return "";
}
