export const convertTime = (time: string) => {
  if (!time) {
    return "Invalid time";
  }
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  let suffix = "AM";
  if (hours >= 12) {
    suffix = "PM";
    if (hours > 12) hours -= 12;
  }

  return (
    hours.toString().padStart(2) +
    ":" +
    minutes.toString().padStart(2, "0") +
    " " +
    suffix
  );
};
