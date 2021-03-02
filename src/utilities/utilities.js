
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
