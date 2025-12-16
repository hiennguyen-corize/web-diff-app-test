/**
 * Formats a price into a currency string.
 *
 * @param {number} price - The price to format.
 * @return {string} The formatted price as a currency string.
 */
export const formatPrice = (price: number): string => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return `$${formattedPrice}`;
};
