export const formatDateYearMonth = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}`;

export const formatDateYearMonthText = (date) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
    date,
  );
