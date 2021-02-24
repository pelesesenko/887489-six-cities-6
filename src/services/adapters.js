export const offerAdapter = (offer) => {

  const {is_favorite: isFavorite,
    is_premium: isPremium,
    max_adults: maxAdults,
    preview_image: previewImage,
    host,
    ...restOffer
  } = offer;

  const {is_pro: isPro, ...restHost} = host;

  return {
    isFavorite,
    isPremium,
    maxAdults,
    previewImage,
    host: {isPro, ...restHost},
    ...restOffer
  };
};

export const offersAdapter = (offers) => (
  offers.map((offer) => offerAdapter(offer))
);
