import { afterAll, afterEach, beforeAll } from "vitest"
import '@testing-library/jest-dom';
import 'vitest-canvas-mock';
import { server } from "./mocks/server"

// Enable request interception.
beforeAll(() => server.listen())

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => server.resetHandlers())

// Don't forget to clean up afterwards.
afterAll(() => server.close())