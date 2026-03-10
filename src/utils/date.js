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
