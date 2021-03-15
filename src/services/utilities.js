
export const prepareRating = (rating) => Math.round(rating) * 20 + `%`;

export const upFirst = (string) => string.slice(0, 1).toUpperCase() + string.slice(1);

export const groupOffersByCity = (offers) => {
  return Object.values(
      offers.reduce((prev, current) => {
        return prev[current.city.name]
          ? {
            ...prev,
            [current.city.name]: {
              cityName: current.city.name,
              offersInCity: [...prev[current.city.name].offersInCity, current]
            }
          }
          : {...prev, [current.city.name]: {cityName: current.city.name, offersInCity: [current]}};
      }, {}));
};

export const snakeToCamelAdapter = (data) => {

  const wordAdapter = (word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  const stringAdapter = (string) => {
    if (!string.includes(`_`)) {
      return string;
    }
    const words = string.split(`_`);
    return words.map((word, i) => i === 0
      ? word.toLowerCase()
      : wordAdapter(word)
    ).join(``);
  };

  if (data instanceof Array) {
    return data.map((item) => snakeToCamelAdapter(item));
  } else if (data instanceof Object) {
    let result = {};
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof Object) {
        result[stringAdapter(key)] = snakeToCamelAdapter(data[key]);
      } else {
        result[stringAdapter(key)] = data[key];
      }
    });
    return result;
  }
  return data;
};
