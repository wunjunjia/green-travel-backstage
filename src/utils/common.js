export function padStart(origin, character, number) {
  return `${origin}`.padStart(number, character);
}

export function debounce(fn, delay = 300) {
  let flag = false;
  return (...args) => {
    if (flag) return;
    flag = true;
    const timer = setTimeout(() => {
      clearTimeout(timer);
      flag = false;
      fn(args);
    }, delay);
  };
}

export function throttle(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(args);
    }, delay);
  };
}

export default {};