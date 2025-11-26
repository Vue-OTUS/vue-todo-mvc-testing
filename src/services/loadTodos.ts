export function loadTodos() {
  return new Promise((res) => {
    const encodedTodos = localStorage.getItem('todos')
    if (!encodedTodos) {
      return res([])
    }

    setTimeout(() => res(JSON.parse(encodedTodos)), 450)
  })
}
