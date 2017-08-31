import moment from 'moment';
import { strings } from './constants';

export const setMomentLocale = locale => moment.locale(locale);

export const getLocaleText = (obj, key, locale) => {
  if (key in strings) {
    return strings[key][locale] || strings[key]['en'];
  }

  return obj[`${key}_${locale}`] || obj[key];
};

export const dayDiff = (start_date, end_date) => {
  const m1 = moment.utc(start_date, 'YYYY-MM-DD');
  const m2 = moment.utc(end_date, 'YYYY-MM-DD');
  return m2.diff(m1, 'days');
};

export const formatDateDisplay = (start_date, end_date, locale) => {
  let dateInterval = '';
  const days = dayDiff(start_date, end_date);
  const m1 = moment.utc(start_date, 'YYYY-MM-DD');
  const m2 = moment.utc(end_date, 'YYYY-MM-DD');

  if (days) {
    const duration = `${days + 1} ${getLocaleText(null, days > 0 ? 'day_pl' : 'day', locale)}`;
    if (m1.month() === m2.month()) {
      dateInterval = `${m1.format('D')} - ${m2.format('D MMMM')}`;
    } else {
      dateInterval = `${m1.format('D MMMM')} - ${m2.format('D MMMM')}`;
    }
    return `${dateInterval} (${duration})`;
  }

  dateInterval = `${m1.format('D MMMM')}`;
  return `${dateInterval}`;
};
