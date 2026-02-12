import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSharePayload } from './shareLink.js';
import { TEACHER_TYPES, DEFAULT_CLASS, MAX_CLASSES } from '../config/salaryConfig.js';

describe('normalizeSharePayload', () => {
    it('should return default values for empty payload', () => {
        const result = normalizeSharePayload({});
        assert.equal(result.teacherType, TEACHER_TYPES.FULL_TIME);
        assert.equal(result.ptBasicHours, 0);
        assert.deepEqual(result.classes, []);
    });

    it('should normalize teacherType', () => {
        // Valid
        assert.equal(normalizeSharePayload({ teacherType: TEACHER_TYPES.PT }).teacherType, TEACHER_TYPES.PT);
        // Invalid
        assert.equal(normalizeSharePayload({ teacherType: 'INVALID' }).teacherType, TEACHER_TYPES.FULL_TIME);
    });

    it('should normalize ptBasicHours', () => {
        // Valid
        assert.equal(normalizeSharePayload({ ptBasicHours: 10 }).ptBasicHours, 10);
        // String number
        assert.equal(normalizeSharePayload({ ptBasicHours: '20' }).ptBasicHours, 20);
        // Negative
        assert.equal(normalizeSharePayload({ ptBasicHours: -5 }).ptBasicHours, 0);
        // Invalid
        assert.equal(normalizeSharePayload({ ptBasicHours: 'abc' }).ptBasicHours, 0);
    });

    it('should normalize classes array', () => {
        // Empty
        assert.deepEqual(normalizeSharePayload({ classes: [] }).classes, []);
        // Non-array
        assert.deepEqual(normalizeSharePayload({ classes: 'not-array' }).classes, []);
        // Max limit
        const manyClasses = Array(MAX_CLASSES + 2).fill({});
        const result = normalizeSharePayload({ classes: manyClasses });
        assert.equal(result.classes.length, MAX_CLASSES);
    });

    it('should normalize individual class fields', () => {
        const inputClass = {
            type: 5,
            count: 3,
            hours: 10,
            frequency: 'single',
            id: 'test-id'
        };
        const result = normalizeSharePayload({ classes: [inputClass] });
        const cls = result.classes[0];

        assert.equal(cls.type, 5);
        assert.equal(cls.count, 3);
        assert.equal(cls.hours, 10);
        assert.equal(cls.frequency, 'single');
        assert.equal(cls.id, 'test-id');
    });

    it('should handle invalid class fields', () => {
        const invalidClass = {
            type: 999, // Invalid
            count: 100, // Exceeds type (which will default to DEFAULT_CLASS.type=10)
            hours: -5, // Negative
            frequency: 'invalid', // Invalid
            // id missing
        };
        const result = normalizeSharePayload({ classes: [invalidClass] });
        const cls = result.classes[0];

        assert.equal(cls.type, DEFAULT_CLASS.type); // 10
        assert.equal(cls.count, 10); // Clamped to type (10)
        assert.equal(cls.hours, 0); // Clamped to 0
        assert.equal(cls.frequency, DEFAULT_CLASS.frequency);
        // ID should be generated (UUID or fallback)
        assert.ok(typeof cls.id === 'string' && cls.id.length > 0);
    });

    it('should clamp class count to type limit', () => {
         // type 5, count 10 -> count 5
         const result = normalizeSharePayload({ classes: [{ type: 5, count: 10 }] });
         assert.equal(result.classes[0].count, 5);
    });
});
