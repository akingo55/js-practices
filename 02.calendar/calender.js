#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2))
const weeks = ['日', '月', '火', '水', '木', '金', '土']

function getYear () {
  const today = new Date()
  let year

  if (typeof args.y === 'undefined') {
    year = today.getFullYear()
  } else {
    year = args.y
  }
  return year
}

function getMonth () {
  const today = new Date()
  let month

  if (typeof args.m === 'undefined') {
    month = today.getMonth() + 1
  } else {
    month = args.m
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

function main () {
  const startDate = new Date(getYear(), getMonth(), 1)
  const endDate = new Date(getYear(), getMonth() + 1, 0)
  const outputCalender = dispCalender(startDate, endDate)

  console.log('\t' + '\t' + startDate.getMonth() + '月' + '\t' + startDate.getFullYear() + '\t' + '\t')
  console.log(weeks.join('\t'))
  console.log(outputCalender)
}

main()
