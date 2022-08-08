import React from 'react';

const dateFormat = dateInput => {
    const dateArray = dateInput.slice(0, 10).split('-');

    switch (dateArray[1]) {
        case '01': return('January '   + dateArray[2] + ', ' + dateArray[0])
        case '02': return('February '  + dateArray[2] + ', ' + dateArray[0])
        case '03': return('March '     + dateArray[2] + ', ' + dateArray[0])
        case '04': return('April '     + dateArray[2] + ', ' + dateArray[0])
        case '05': return('May '       + dateArray[2] + ', ' + dateArray[0])
        case '06': return('June '      + dateArray[2] + ', ' + dateArray[0])
        case '07': return('July '      + dateArray[2] + ', ' + dateArray[0])
        case '08': return('August '    + dateArray[2] + ', ' + dateArray[0])
        case '09': return('September ' + dateArray[2] + ', ' + dateArray[0])
        case '10': return('October '   + dateArray[2] + ', ' + dateArray[0])
        case '11': return('November '  + dateArray[2] + ', ' + dateArray[0])
        case '12': return('December '  + dateArray[2] + ', ' + dateArray[0])
    }
};

export default dateFormat;