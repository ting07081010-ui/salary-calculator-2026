import {
    CLASS_TYPES,
    DEFAULT_CLASS,
    FREQUENCY_OPTIONS,
    MAX_CLASSES,
    TEACHER_TYPES
} from '../config/salaryConfig';
import { generateId } from './formatters';

const CLASS_TYPE_VALUES = new Set(CLASS_TYPES.map(({ value }) => value));
const FREQUENCY_VALUES = new Set(Object.keys(FREQUENCY_OPTIONS));
const TEACHER_TYPE_VALUES = new Set(Object.values(TEACHER_TYPES));

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const toNumber = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const base64UrlEncode = (value) => {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    for (let i = 0; i < bytes.length; i += 1) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const base64UrlDecode = (value) => {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
    const binary = atob(`${normalized}${padding}`);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
};

export const normalizeSharePayload = (payload = {}) => {
    const teacherType = TEACHER_TYPE_VALUES.has(payload.teacherType)
        ? payload.teacherType
        : TEACHER_TYPES.FULL_TIME;

    const ptBasicHours = Math.max(0, toNumber(payload.ptBasicHours, 0));

    const rawClasses = Array.isArray(payload.classes) ? payload.classes : [];
    const classes = rawClasses.slice(0, MAX_CLASSES).map((cls) => {
        const type = CLASS_TYPE_VALUES.has(toNumber(cls?.type, DEFAULT_CLASS.type))
            ? toNumber(cls?.type, DEFAULT_CLASS.type)
            : DEFAULT_CLASS.type;

        const count = clamp(toNumber(cls?.count, 0), 0, type);
        const hours = Math.max(0, toNumber(cls?.hours, DEFAULT_CLASS.hours));
        const frequency = FREQUENCY_VALUES.has(cls?.frequency)
            ? cls.frequency
            : DEFAULT_CLASS.frequency;
        const id = typeof cls?.id === 'string' && cls.id.trim() ? cls.id : generateId();

        return {
            id,
            type,
            count,
            hours,
            frequency
        };
    });

    return { teacherType, classes, ptBasicHours };
};

export const encodeSharePayload = (payload) => {
    const normalized = normalizeSharePayload(payload);
    return base64UrlEncode(JSON.stringify({ v: 1, data: normalized }));
};

export const decodeSharePayload = (encoded) => {
    if (!encoded || typeof encoded !== 'string') return null;

    try {
        const decoded = JSON.parse(base64UrlDecode(encoded));
        if (decoded && typeof decoded === 'object' && 'v' in decoded) {
            if (decoded.v !== 1 || !decoded.data) return null;
            return normalizeSharePayload(decoded.data);
        }
        return normalizeSharePayload(decoded);
    } catch (error) {
        console.warn('無法解析分享參數', error);
        return null;
    }
};
