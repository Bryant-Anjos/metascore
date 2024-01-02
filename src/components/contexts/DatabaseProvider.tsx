import { ReactNode, createContext, useEffect } from 'react'
import * as SQLite from 'expo-sqlite'

function openDatabase() {
  const db = SQLite.openDatabase('metascore.db')
  return db
}

const db = openDatabase()

function runQuery<T>(query: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, { rows: { _array } }) => {
          resolve(_array)
        },
        (_, error) => {
          reject(error)
          return true
        },
      )
    })
  })
}

interface DatabaseContextValue {
  runQuery: typeof runQuery
}

export const DatabaseContext = createContext<DatabaseContextValue>(
  {} as DatabaseContextValue,
)

interface DatabaseProviderProps {
  children: ReactNode
}

export default function DatabaseProvider(props: DatabaseProviderProps) {
  useEffect(() => {
    runQuery(
      'CREATE TABLE IF NOT EXISTS goals (id TEXT PRIMARY KEY NOT NULL, name TEXT);',
    ).then(() => {
      runQuery(
        'CREATE TABLE IF NOT EXISTS goal_records (id INTEGER PRIMARY KEY AUTOINCREMENT, goal_id TEXT, year INTEGER, month INTEGER, day INTEGER, FOREIGN KEY (goal_id) REFERENCES goals(id), UNIQUE (goal_id, year, month, day));',
      )
    })
  }, [])

  return <DatabaseContext.Provider {...props} value={{ runQuery }} />
}
