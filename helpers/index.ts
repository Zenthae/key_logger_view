import { isAfter, isBefore } from 'date-fns';

export function isBetween(value: Date, left: Date, right: Date): boolean {
  return isBefore(new Date(value), right) && isAfter(new Date(value), left);
}

// export const calendar = {
//   Janvier: 31,
//   Fevrier: 28, // Don't forget to +1 in leap years
//   Mars: 31,
//   Avril: 30,
//   Mai: 31,
//   Juin: 30,
//   Juillet: 31,
//   Aout: 31,
//   Septembre: 30,
//   Octobre: 31,
//   Novembre: 30,
//   Decembre: 31,
// };

// // Number of day by months, starting from 0 (january)
// export const calendar = [
//   31,
//   28, // Don't forget to +1 in leap years
//   31,
//   30,
//   31,
//   30,
//   31,
//   31,
//   30,
//   31,
//   30,
//   31,
// ];
