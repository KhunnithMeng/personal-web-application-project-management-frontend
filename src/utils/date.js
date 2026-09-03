export function formatDate(date) {
    return date ? new Date(date).toDateString() : null;
}

export function formatDateLocal(date) {
   const d = new Date(date);
   const year = d.getFullYear();
   const month = String(d.getMonth() + 1).padStart(2, "0");
   const day = String(d.getDate()).padStart(2, "0");

   return `${year}-${month}-${day}`;
}

/**
 * Get number of days between 2 given dates
 * @param firstDate
 * @param secondDate
 */
export function getDaysBetweenDates(firstDate, secondDate) {
   const firstDateDays = new Date(firstDate)
   const secondDateDays = new Date(secondDate)
   const differenceInMs = Math.abs(firstDateDays - secondDateDays);
   return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
}

/**
 * Format iso string date to normal date
 * @param date
 */
export function getDateOnly(date) {
   if (!date) return;

   const formattedDate = new Date(date);
   const year = formattedDate.getFullYear();
   const month = String((formattedDate.getMonth() + 1)).padStart(2, '0');
   const day = String(formattedDate.getDate()).padStart(2, '0');

   return `${year}-${month}-${day}`;
}
