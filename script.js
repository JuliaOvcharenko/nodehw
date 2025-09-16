const moment = require('moment')

let getCurrentMonth = () => {
    console.log(moment().format('MMMM'))
}

let getCurrentYear = () => {
    console.log(moment().format('yyyy'))
}

// getCurrentMonth()
// getCurrentYear()

let getDate = () => {
    console.log(moment().format('YYYY/MM/DD HH:mm:ss'))
}

// getDate()

let getCurrentDay = () => {
    console.log(moment().format('dddd'))
}

getCurrentDay()