import {beforeEach, describe, vi, it, expect} from "vitest";
import {render, cleanup} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.tsx";

// Mocking translate function
vi.mock('../services/translate.service.ts', () => ({
    translate: vi.fn().mockImplementation(async () => 'Hello world')
}));

describe('App.tsx', () => {
    beforeEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('should work as expected', async () => {
        const user = userEvent.setup();
        const app = render(<App/>);

        const textareaFrom = app.getByPlaceholderText('Enter text');

        await user.type(textareaFrom, 'Hola mundo');

        // Waiting for the api response
        // const result = await app.findByDisplayValue(/Hello world/i, {}, {timeout: 2000});

        // Using mocked method
        const result = await app.findByDisplayValue(/Hello world/i);


        expect(result).toBeTruthy();
    });
});
