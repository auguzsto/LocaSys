
let dateLocalTime = () => {
    return (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString();
  
}

let initConv = (value) => {
   return value ? new Date(value.split('/').reverse().join('-')) : '2001-01-01T00:00:00.000Z'
}

let finishConv = (value) => {
    return value ? new Date(value.split('/').reverse().join('-')).toISOString().split('T')[0] + 'T23:59:59.000Z': new Date().toISOString().split('T')[0] + 'T23:59:59.000Z'
}


module.exports = {dateLocalTime, initConv, finishConv}
