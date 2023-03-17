export function useDatetime() {
  return (option:string) => {
    let date = new Date
    return date.toLocaleString(option)
  }
}

export function useCapitalize() {
  return (text:string) => text[0].toUpperCase() + text.slice(1)
}

