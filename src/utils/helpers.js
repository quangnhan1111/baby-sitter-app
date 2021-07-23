export const formatDate = (date) => {
  // YYYY-MM-DD
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  let string = date.toLocaleDateString('ko-KR', options).replace(/\. /g, '-')

  return string.substr(0, string.length - 1)
}

export const formatDateForDb = (date) => {
  var d = new Date(date)
  var month = '' + (d.getMonth() + 1)
  var day = '' + d.getDate()
  var year = d.getFullYear()

  if (month.length < 2) { month = '0' + month }
  if (day.length < 2) { day = '0' + day }

  return [year, month, day].join('-')
}

export function createEventId() {
  return String(Math.floor(Math.random() * 1000))
}
