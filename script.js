const moment = require('moment')

let getCurrentDay = () => {
    console.log(moment().format('dddd'))
}

let getCurrentMonth = () => {
    console.log(moment().format('MMMM'))
}

let getCurrentYear = () => {
    console.log(moment().format('yyyy'))
}

// getCurrentDay()
// getCurrentMonth()
// getCurrentYear()

let getDate = () => {
    console.log(moment().format('YYYY/MM/DD HH:mm:ss'))
}

getDate()