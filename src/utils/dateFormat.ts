export const getFormattedDate = (date: Date) => {
    const month = (date.getMonth()+1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`;
};

export const changeDateFormat = (date : string) => {
    const day = date.match(/^\d\d\//)?.[0].slice(0,2)
    const month = date.match(/\/\d\d\//)?.[0].slice(1,3)
    const year = date.match(/\d\d\d\d/)
    return `${year}-${month}-${day}`
}

export const oneMonthFromDate = (date : string) => {
    const currentDate = new Date(date?date : new Date())
    const newDate =  new Date(currentDate.setDate(currentDate.getDate() + 30))
    const month = (newDate.getMonth()+1).toString().padStart(2, '0')
    const day = newDate.getDate().toString().padStart(2, '0');
    const year = newDate.getFullYear().toString()
    return `${day}/${month}/${year}`;
}