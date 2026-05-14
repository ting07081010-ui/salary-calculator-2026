import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getClassStage } from './formatters.js';

describe('getClassStage', () => {
    test('should return "完全體" when ratio > 0.8', () => {
        assert.strictEqual(getClassStage(9, 10), '完全體');
        assert.strictEqual(getClassStage(8.1, 10), '完全體');
    });

    test('should return "成熟期" when 0.5 < ratio <= 0.8', () => {
        assert.strictEqual(getClassStage(8, 10), '成熟期'); // ratio = 0.8
        assert.strictEqual(getClassStage(6, 10), '成熟期'); // ratio = 0.6
        assert.strictEqual(getClassStage(5.1, 10), '成熟期'); // ratio = 0.51
    });

    test('should return "成長期" when 0 < ratio <= 0.5', () => {
        assert.strictEqual(getClassStage(5, 10), '成長期'); // ratio = 0.5
        assert.strictEqual(getClassStage(2, 10), '成長期'); // ratio = 0.2
        assert.strictEqual(getClassStage(0.1, 10), '成長期'); // ratio = 0.01
    });

    test('should return "招生中" when ratio <= 0', () => {
        assert.strictEqual(getClassStage(0, 10), '招生中');
        assert.strictEqual(getClassStage(-1, 10), '招生中');
    });

    test('should handle edge cases like maxStudents = 0', () => {
        // 1 / 0 is Infinity, Infinity > 0.8, so it returns '完全體'
        assert.strictEqual(getClassStage(1, 0), '完全體');
        // 0 / 0 is NaN, all comparisons with NaN are false, returns '招生中'
        assert.strictEqual(getClassStage(0, 0), '招生中');
    });
});
