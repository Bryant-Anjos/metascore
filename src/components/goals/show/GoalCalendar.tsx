import { useMemo } from 'react'
import { Calendar } from 'react-native-calendars'
import { MarkedDates } from 'react-native-calendars/src/types'

import { GoalRecord } from '@src/types/goals'
import Colors from '@src/constants/Colors'

interface GoalCalendarProps {
  records: GoalRecord[]
}

function addLeftZero(value: number) {
  return value.toString().padStart(2, '0')
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

export default function GoalCalendar({ records }: GoalCalendarProps) {
  const markedDates = useMemo(() => getMarkedDates(records), [records])
  console.log('markedDates', JSON.stringify(markedDates, null, 2))

  return <Calendar className="mb-20 rounded-xl" markedDates={markedDates} />
}
