export function lowerCase(str: string) {
  return str.toLowerCase();
}

export function firstLetterUppercase(str: string) {
  const valueString = lowerCase(`${str}`);
  return `${valueString.charAt(0).toUpperCase()}${valueString.slice(1).toLowerCase()}`;
}

export function replaceSpacesWithDash(title: string) {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/\/| /g, '-'); // replace / and space with -
}

export function replaceDashWithSpaces(title: string) {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/-|\/| /g, ' '); // replace - / and space with -
}

export function replaceAmpersandWithSpace(title: string) {
  return title.replace(/&/g, '');
}

export function replaceAmpersandAndDashWithSpace(title: string) {
  const titleWithoutDash = replaceDashWithSpaces(title);
  return titleWithoutDash.replace(/&| /g, ' ');
}

export function categories() {
  return [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Photography',
    'Data',
    'Business',
  ];
}

export function saveToLocalStorage(key: string, data: string) {
  window.localStorage.setItem(key, data);
}

export function saveToSessionStorage(
  data: string,
  username: string,
  token: string,
) {
  window.sessionStorage.setItem('isLoggedIn', data);
  window.sessionStorage.setItem('loggedInuser', username);
  window.sessionStorage.setItem('accessToken', token);
}

export function getDataFromSessionStorage(
  key: 'isLoggedIn' | 'loggedInuser' | 'accessToken',
) {
  const data = window.sessionStorage.getItem(key) as string;
  return JSON.parse(data);
}
