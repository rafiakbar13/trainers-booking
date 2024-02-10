export function convertCurrency(ticketPrice: number) {
  // Mengecek apakah ticketPrice adalah angka
  if (isNaN(ticketPrice)) {
    return "Invalid input";
  }

  // Mengonversi ticketPrice menjadi string dan memisahkan ribuan dengan tanda titik (.)
  const formattedPrice = ticketPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Mengembalikan nilai ticketPrice dalam format Rupiah (IDR)
  return `IDR ${formattedPrice}`;
}
