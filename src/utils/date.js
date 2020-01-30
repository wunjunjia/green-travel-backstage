import { padStart } from './common';

export function getDate() {
  const date = new Date();
  return `${date.getFullYear()}-${padStart(date.getMonth() + 1, '0', 2)}-${padStart(date.getDate(), '0', 2)}`;
}

export default {
  getDate,
};