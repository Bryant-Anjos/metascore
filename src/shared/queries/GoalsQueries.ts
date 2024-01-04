import sql from '@src/shared/utils/sql'

export function listGoalsQuery(year: number, month: number, day: number) {
  return sql`
    SELECT
      g.id,
      g.name, 
      CASE WHEN gr.goal_id IS NOT NULL
        THEN 1
        ELSE 0
      END AS "checked"
    FROM goals g 
    LEFT JOIN goal_records gr
      ON g.id = gr.goal_id 
        AND gr.year = ${year}
        AND gr.month = ${month}
        AND gr.day = ${day};
  `
}

export function addGoalQuery(id: string, name: string) {
  return sql`
    INSERT INTO goals (id, name)
    VALUES (${id}, ${name});
  `
}

export function listGoalRecordsQuery(id: string, year: number) {
  return sql`
    SELECT
      gr.id,
      gr.goal_id AS "goalId",
      gr.year,
      gr.month,
      gr.day
    FROM goal_records gr
    WHERE gr.goal_id = ${id}
      AND gr.year = ${year};
  `
}

export function checkGoalQuery(
  id: string,
  year: number,
  month: number,
  day: number,
) {
  return sql`
    INSERT INTO goal_records (goal_id, year, month, day)
    VALUES (${id}, ${year}, ${month}, ${day});
  `
}

export function uncheckGoalQuery(
  id: string,
  year: number,
  month: number,
  day: number,
) {
  return sql`
    DELETE FROM goal_records
    WHERE goal_id = ${id}
      AND year = ${year}
      AND month = ${month}
      AND day = ${day};
  `
}
