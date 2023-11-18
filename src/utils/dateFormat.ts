export const getFormattedDate = (date: Date) => {
    const month = date.getMonth().toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`;
};