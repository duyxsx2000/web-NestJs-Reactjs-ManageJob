
const getStringDate = (time: Date) => {
    const date = new Date(time)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
};

function calculateDaysDifference(targetDate: Date): number {
    const currentDate: Date = new Date();
    const target: Date = new Date(targetDate);
    if (isNaN(target.getTime())) {
       return 0
    };

    const differenceInMilliseconds: number = target.getTime() - currentDate.getTime() ;
    const differenceInDays: number = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return differenceInDays;
}



export {getStringDate, calculateDaysDifference}