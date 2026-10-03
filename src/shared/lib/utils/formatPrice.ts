export const formatPrice = (num: number) => {
  return new Intl.NumberFormat("fr-FR").format(num);
};