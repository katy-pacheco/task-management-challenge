export function formatDueDate(dateStr: string): string {
  const dueDate = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (firstDate: Date, secondDate: Date) =>
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate();

  if (isSameDay(dueDate, today)) return "TODAY";
  if (isSameDay(dueDate, yesterday)) return "YESTERDAY";

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return dueDate.toLocaleDateString("en-US", formatOptions).toUpperCase();
}
