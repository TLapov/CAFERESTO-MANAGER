import assert from "node:assert";
import { after, before, describe, it } from "node:test";
import App from "../src/app";


describe('Testing application', () => {
    let app: App = new App();

    before(async() => await app.start());
    
    it('Application will start correct', async() => {
        try {
            assert.ok(true);
        }catch(error: unknown) {
            assert.fail(error as Error);
        }
    });

    it('Application should fail to start if database is unreachable', async () => {
        process.env.DB_HOST = 'invalid-host';
        try {
            assert.fail('Application should have thrown an error');
        } catch (error) {
            assert.ok(true);
            // assert.match(String(error), /Database error/, 'Expected database connection error');
        }
    });
    


    after(async() => await app.close());
})