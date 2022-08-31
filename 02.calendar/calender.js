#!/usr/bin/env node

function main () {
  const args = require('minimist')(process.argv.slice(2))
  const weeks = ['日', '月', '火', '水', '木', '金', '土']
  const startDate = new Date(getYear(args.y), getMonth(args.m), 1)
  const endDate = new Date(getYear(args.y), getMonth(args.m) + 1, 0)

  console.log('\t' + '\t' + (startDate.getMonth() + 1) + '月' + '\t' + startDate.getFullYear() + '\t' + '\t')
  console.log(weeks.join('\t'))
  console.log(dispCalender(startDate, endDate))
}

function getYear (argYear) {
  let year

  if (typeof argYear === 'undefined') {
    const today = new Date()
    year = today.getFullYear()
  } else {
    year = argYear
  }
  return year
}

function getMonth (argMonth) {
  let month

  if (typeof argMonth === 'undefined') {
    const today = new Date()
    month = today.getMonth()
  } else {
    month = argMonth - 1
  }

  return month
}

function dispCalender (startDate, endDate) {
  let weekDays = []
  const calender = []

  if (startDate.getDay() >= 1) {
    const str = ' '
    weekDays = str.repeat(startDate.getDay()).split('')
  }

  for (let day = 1; day <= endDate.getDate(); day++) {
    const date = new Date(getYear(), getMonth(), day)

    weekDays.push(day)

    if (date.getDay() === 6 || day === endDate.getDate()) {
      calender.push(weekDays.join('\t'))
      weekDays = []
    }
  }

  return calender.join('\n')
}

main()
