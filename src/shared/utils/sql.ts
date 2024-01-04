const sql = <Params, ParamsArray extends Array<Params>>(
  strings: TemplateStringsArray,
  ...params: ParamsArray
) => {
  const query = strings
    .map((string, index) => {
      if (index > 0) {
        return `?${string}`
      }
      return string
    })
    .join('')
    .trim()
    .replace(/\s+/g, ' ')

  return { query, params }
}

export default sql
