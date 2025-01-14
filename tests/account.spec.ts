import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8081/api/account';

test.describe('Validate Account Microservice API', () => {
    let accountId: string;

    test('Verify User able to Create Account', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create`, {
            data: { name: 'John Doe', email: 'john.doe@example.com' },
        });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        accountId = responseBody.data._id; 
        expect(responseBody.data.name).toBe('John Doe');
    });

    test('Verify User able to Get Account info', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/${accountId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.data.name).toBe('John Doe');
        expect(responseBody.data.email).toBe('john.doe@example.com');
    });

    test('Verify User able to Update Account info', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/${accountId}`, {
            data: { name: 'Jane Doe', email: 'jane.doe@example.com' },
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.data.name).toBe('Jane Doe');
        expect(responseBody.data.email).toBe('jane.doe@example.com');
    });

    test('Verify User able to Delete Account', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/${accountId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.message).toBe(`Account ${accountId} deleted successfully.`);
    });
});
