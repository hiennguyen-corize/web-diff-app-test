/**
 * Formats a price into a currency string.
 *
 * @param {number} price - The price to format.
 * @return {string} The formatted price as a currency string.
 */
export const formatPrice = (price: number): string => {
  // Validate input: ensure price is a valid number
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00';
  }

  // Handle negative prices by converting to absolute value
  const absolutePrice = Math.abs(price);

  // Round to 2 decimal places to avoid floating point issues
  const roundedPrice = Math.round(absolutePrice * 100) / 100;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundedPrice);

  return `$${formattedPrice}`;
};
