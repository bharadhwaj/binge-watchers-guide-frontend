import { regex } from '../constants';

export const getCompleteUrl = url =>
  url.match(regex.URL_WITH_HTTP) ? url : 'https://' + url;
