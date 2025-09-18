export function decodeToken(token) {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length < 3) return null;
    const payload = parts[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}