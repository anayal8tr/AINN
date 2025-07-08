// import { API_BASE_URL } from '../config';

// export async function restoreCSRF() {
//     try {
//         const response = await fetch(`${API_BASE_URL}/csrf/restore`, {
//             credentials: 'include'
//         });
//         if (response.ok) {
//             const data = await response.json();
//             return data['XSRF-Token'];
//         }
//         throw new Error('Failed to restore CSRF token');
//     } catch (error) {
//         console.error('Error restoring CSRF token:', error);
//         throw error;
//     }
// }

// export function getCSRFToken() {
//     try {
//         const token = document.cookie
//             .split('; ')
//             .find(row => row.startsWith('XSRF-TOKEN='))
//             ?.split('=')[1];
//         return token;
//     } catch (error) {
//         console.error('Error getting CSRF token:', error);
//         return null;
//     }
// } 
// frontend/src/store/csrf.js

import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json", and set the "XSRF-TOKEN" header to the value of the
  // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);

  // if the response status code is 400 or above, then throw an error with the
  // error being the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the
  // next promise chain
  return res;
}


// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
  }