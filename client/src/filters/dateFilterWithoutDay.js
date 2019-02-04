export default (value) => {
  const date = new Date(value)
  if (value === null ) {
      return ''
  } else {
      return date.toLocaleString(['ru-RU'], {year: 'numeric', month: 'numeric'})
  }
}