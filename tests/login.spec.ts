import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8080/api/login';

test.describe('Validate Login Microservice API', () => {
    test('Verify registeration of User successful', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/register`, {
            data: { username: 'testuser', password: 'password123' },
        });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody.message).toBe('User testuser registered successfully.');
    });

    test('Verify User able Authenticate Successfully', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/authenticate`, {
            data: { username: 'testuser', password: 'password123' },
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.message).toBe('Authentication successful.');
    });

    test('Verify User Deleted Successfully', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/testuser`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.message).toBe('User testuser deleted successfully.');
    });
});
