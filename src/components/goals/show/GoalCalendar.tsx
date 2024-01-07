import { useMemo } from 'react'
import { Calendar } from 'react-native-calendars'
import { DateData, MarkedDates } from 'react-native-calendars/src/types'

import { GoalRecord } from '@src/types/goals'
import Colors from '@src/constants/Colors'
import getDateParts from '@src/shared/utils/getDateParts'

interface GoalCalendarProps {
  date: Date
  records: GoalRecord[]
  changeDate: (year: number, month: number, day: number) => void
}

function addLeftZero(value: number) {
  return value.toString().padStart(2, '0')
}

function addSelectedDay(date: Date, markedDates: MarkedDates): MarkedDates {
  const [year, month, day] = getDateParts(date)
  const key = `${year}-${addLeftZero(month)}-${addLeftZero(day)}`
  const dateConfig = markedDates[key]
  return {
    ...markedDates,
    [`${year}-${addLeftZero(month)}-${addLeftZero(day)}`]: {
      ...markedDates[key],
      marked: true,
      dotColor: dateConfig?.selected
        ? Colors.light.white
        : Colors.light.success,
      type: 'period',
    },
  }
}

function getMarkedDates(records: GoalRecord[]): MarkedDates {
  return records.reduce(
    (markedDates, { year, month, day }) => ({
      ...markedDates,
      [`${year}-${addLeftZero(month)}-${addLeftZero(day)}`]: {
        selected: true,
        selectedColor: Colors.light.success,
      },
    }),
    {} as MarkedDates,
  )
}

export default function GoalCalendar({
  date,
  records,
  changeDate,
}: GoalCalendarProps) {
  const markedDates = useMemo(
    () => addSelectedDay(date, getMarkedDates(records)),
    [date, records],
  )

  function onChangeDate({ year, month, day }: DateData) {
    changeDate(year, month - 1, day)
  }

  return (
    <Calendar
      className="mb-20 rounded-xl"
      markedDates={markedDates}
      onMonthChange={onChangeDate}
      onDayPress={onChangeDate}
    />
  )
}
