const TOKEN_KEY = 'yyx-admin-token';
const USER_KEY = 'yyx-admin-user';

export function login(payload) {
  localStorage.setItem(TOKEN_KEY, 'demo-token');
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      username: payload.username,
      role: '超级管理员',
      displayName: 'admin'
    })
  );
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : { username: 'admin', role: '超级管理员', displayName: 'admin' };
}
