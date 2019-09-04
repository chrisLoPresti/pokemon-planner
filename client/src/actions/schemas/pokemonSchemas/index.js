export const pokemonListScheme = list => {
  const array = [];

  list.forEach(pokemon => {
    const { form, ...rest } = pokemon;
    array.push(rest);
    pokemon.form.forEach(altForm => {
      const parentForm = {
        nationalNumber: pokemon.nationalNumber,
        sprite: pokemon.sprite,
        isLegendary: pokemon.isLegendary,
        isMythic: pokemon.isMythic,
        isPseudo: pokemon.isPseudo,
        stage: pokemon.stage,
        fullyEvolved: pokemon.fullyEvolved,
        isMega: pokemon.isMega,
        region: pokemon.region,
        form: pokemon.form,
        name: pokemon.name,
        type: pokemon.type
      };
      array.push({
        ...pokemon,
        form: pokemon.form.length
          ? [
              ...pokemon.form.filter(
                parentAlts =>
                  parentAlts.name &&
                  parentAlts.name.english !== altForm.name.english
              ),
              parentForm
            ]
          : [parentForm],
        ...altForm,
        _id: `${pokemon._id}-${Math.random() * 100}`
      });
    });
  });
  return array.sort(
    (pokemon1, pokemon2) => +pokemon1.nationalNumber - +pokemon2.nationalNumber
  );
};
