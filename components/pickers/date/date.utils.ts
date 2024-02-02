export const maskDate = (value: string): string => {
  const allowedType = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const key = value[value.length - 1];
  const previous = value.slice(0, -1);

  if(!allowedType.includes(key)) {
    return previous;
  }
  
  var len = value.length;
  
  if(len === 2) {
    value += '/';
  }

  if(len === 5) {
    value += '/';
  }

  if(len === 11) {
    return previous;
  }

  return value;
}

export const getDate = (dateStr: string): Date => {
  const date = Date.parse(dateStr);
  if(!isNaN(date)) {
    return new Date(date);
  }

  return new Date();
}

// export const isDateValid = (dateStr: string): boolean => {
//   return !isNaN(Date.parse(dateStr));
// }
export const isDateValid = (date: string): boolean => {
  let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;
  
    if (date.match(dateformat)) {
        let operator = date.split('/');
 
        let datepart = [];
        if (operator.length > 1) {
            datepart = date.split('/');
        }
        let day = parseInt(datepart[0]);
        let month = parseInt(datepart[1]);
        let year = parseInt(datepart[2]);
  
        let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month == 1 || (month > 2 && month <= 12)) {
            if (day > ListofDays[month - 1]) { 
                return false;
            }
        } else if (month == 2) {
            let leapYear = false;
            if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
            if ((leapYear == false) && (day >= 29)) {
                return false;
            }
            else
                if ((leapYear == true) && (day > 29)) {
                    return false;
                }
        } else {
          return false;
        }
    } else {
        return false;
    }
    return true;
}