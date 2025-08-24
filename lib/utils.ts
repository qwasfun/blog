export function normalizeSrc(path?: string) {
  if (!path) return path
  // ? 匹配前面的子表达式零次或一次
  // * 匹配前面的子表达式零次或多次
  // + 匹配前面的子表达式一次或多次
  return path.replace(/^((\.\.\/)+|\/)public\/static/, '/static')
}
