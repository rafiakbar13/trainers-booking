export function convertCurrency(ticketPrice: number) {
  if (isNaN(ticketPrice)) {
    return "Invalid input";
  }

  const formattedPrice = ticketPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `IDR ${formattedPrice}`;
}
