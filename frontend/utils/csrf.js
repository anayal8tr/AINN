import { API_BASE_URL } from '../config';

export async function restoreCSRF() {
    try {
        const response = await fetch(`${API_BASE_URL}/csrf/restore`, {
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            return data['XSRF-Token'];
        }
        throw new Error('Failed to restore CSRF token');
    } catch (error) {
        console.error('Error restoring CSRF token:', error);
        throw error;
    }
}

export function getCSRFToken() {
    try {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        return token;
    } catch (error) {
        console.error('Error getting CSRF token:', error);
        return null;
    }
} 