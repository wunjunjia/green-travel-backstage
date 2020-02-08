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

export function equal(a, b) {
  return Object.keys(a).every(key => a[key] === b[key]);
}

export function unique(arr) {
  const obj = {};
  return arr.filter((item) => {
    if (obj.hasOwnProperty(typeof item + item)) return false;
    obj[typeof item + item] = true;
    return true;
  });
}

export default {};