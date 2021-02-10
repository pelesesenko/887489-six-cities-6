
export const prepareRating = (rating) => Math.round(rating) * 20 + `%`;

export const upFirst = (string) => string.slice(0, 1).toUpperCase() + string.slice(1);

export const formatDate = (dateString) =>{
  const template =
    `January February March April May June July August September October November December`.split(` `);
  const date = new Date(dateString);
  return `${template[date.getMonth()]} ${date.getFullYear()}`;
};
