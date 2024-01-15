import { getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { LocaleConfig } from 'react-native-calendars'

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
}

LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
}

const pt = {
  app: {
    name: 'Metascore',
  },
  show: {
    total: 'Total',
  },
  create: {
    placeholder: 'Criar nova meta',
  },
  update: {
    check: 'Marcar como feito',
    uncheck: 'Marcar como não feito',
    placeholder: 'Mudar nome da meta',
  },
}

const en = {
  app: {
    name: 'Metascore',
  },
  show: {
    total: 'Total',
  },
  create: {
    placeholder: 'Create new goal',
  },
  update: {
    check: 'Mark as Done',
    uncheck: 'Mark as Undone',
    placeholder: 'Change goal name',
  },
}

type Translations = typeof en | typeof pt

const translations = {
  en,
  pt,
} satisfies Record<string, Translations>

type Locales = keyof typeof translations

const i18n = new I18n(translations)

type DeepKey<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? `${K & string}${'' extends DeepKey<T[K]> ? '' : '.'}${DeepKey<T[K]>}`
        : never
    }[keyof T]
  : ''

type ExtractInterpolations<S extends string> =
  S extends `${infer _Start}%{${infer I}}${infer Rest}`
    ? I extends `${infer Key}:${infer Type}`
      ? {
          [K in Key]: Type extends 'number'
            ? number
            : Type extends 'boolean'
            ? boolean
            : string
        } & ExtractInterpolations<Rest>
      : { [K in I]: string } & ExtractInterpolations<Rest>
    : {}

type Interpolations<T, K extends DeepKey<T>> = K extends keyof T
  ? T[K] extends string
    ? ExtractInterpolations<T[K]>
    : T[K] extends object
    ? Interpolations<T[K], DeepKey<T[K]>>
    : never
  : K extends `${infer P}.${infer R}`
  ? P extends keyof T
    ? R extends DeepKey<T[P]>
      ? Interpolations<T[P], R>
      : never
    : never
  : never

type Replacements<T extends DeepKey<Translations>> = Interpolations<
  Translations,
  T
>

type TranslateFunction = <Key extends DeepKey<Translations>>(
  key: Key,
  replacements?: Interpolations<Translations, Key> | undefined,
) => string

interface TranslationContextValue {
  locale: Locales
  changeLocale(newLocale: Locales): void
  translate: TranslateFunction
  t: TranslateFunction
}

export const TranslationContext = createContext<TranslationContextValue>(
  {} as TranslationContextValue,
)

interface TranslationProviderProps {
  children: ReactNode
}

export default function TranslationProvider(props: TranslationProviderProps) {
  const [locale, setLocale] = useState<Locales>(
    getLocales()[0]!.languageCode as Locales,
  )

  useEffect(() => {
    i18n.locale = locale
    LocaleConfig.defaultLocale = locale
  }, [locale])

  function changeLocale(newLocale: Locales) {
    setLocale(newLocale)
  }

  function removeTypeAnnotations(input: string): string {
    const regex = /%{[^:}]+:[^}]+}/g
    return input.replace(regex, match => match.replace(/:[^}]+/, ''))
  }

  const translate = <Key extends DeepKey<Translations>>(
    key: Key,
    replacements?: Replacements<Key>,
  ) => {
    return i18n.t(removeTypeAnnotations(key), replacements)
  }

  return (
    <TranslationContext.Provider
      {...props}
      value={{ locale, changeLocale, translate, t: translate }}
    />
  )
}
