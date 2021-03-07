
export const prepareRating = (rating) => Math.round(rating) * 20 + `%`;

export const upFirst = (string) => string.slice(0, 1).toUpperCase() + string.slice(1);

export const groupOffersByCity = (offers) => {
  const groupedOffers = [];
  let swap = null;
  for (let offer of offers.slice().sort((a, b)=>a.city.name > b.city.name ? 1 : -1)) {
    if (offer.city.name !== swap) {
      groupedOffers.push({cityName: offer.city.name, offersInCity: []});
      swap = offer.city.name;
    }
    groupedOffers[groupedOffers.length - 1].offersInCity.push(offer);
  }
  return groupedOffers;
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
