
export const prepareRating = (rating) => Math.round(rating) * 20 + `%`;

export const upFirst = (string) => string.slice(0, 1).toUpperCase() + string.slice(1);
