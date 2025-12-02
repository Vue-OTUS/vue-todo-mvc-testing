import { computed, ref } from 'vue'

export function useCalc(x1: number, x2: number) {
  const a = ref(x1)
  const b = ref(x2)
  const sum = computed(() => a.value + b.value)

  function changeA(newA: number) {
    a.value = newA
  }

  return {
    a,
    b,
    sum,
    changeA,
  }
}
