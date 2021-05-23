/**
 * @jest-environment jsdom
 */

// sum.test.js
import { pushToHistory } from '../scripts/router.js';


describe('case: settings', () => {

    test('history length', () => {
        let temp = history.length;
        pushToHistory('settings');
        expect(history.length).toBe((temp + 1));
    });

    test('state settings', () => {
        pushToHistory('settings');
        let obj = { 'page': 'settings' };
        expect(history.state).toEqual(obj);
    });

});

describe('case: entry', () => {

    test('history length', () => {
        let temp = history.length;
        pushToHistory('entry', 1);
        expect(history.length).toBe((temp + 1));
    });

    test('state entry', () => {
        pushToHistory('entry', 1);
        let obj = { 'page': 'entry1' };
        expect(history.state).toEqual(obj);
    });
});

describe('case: default', () => {

    test('history length', () => {
        let temp = history.length;
        pushToHistory("aaerhaehra");
        expect(history.length).toBe((temp + 1));
    });

    test('state default', () => {
        pushToHistory("w45yhs");
        let obj = {};
        expect(history.state).toEqual(obj);
    });

});