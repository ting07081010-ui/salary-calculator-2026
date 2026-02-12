import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import PinGuard from './PinGuard';

// Mock the config
const MOCK_PIN_HASH = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'; // SHA-256 of '1234'

vi.mock('../../config/securityConfig', () => ({
  SECURITY_CONFIG: {
    PIN_LENGTH: 4,
    PIN_HASH: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', // SHA-256 of '1234'
    CORRECT_PIN: '1234',
    MAX_ATTEMPTS: 3,
    LOCKOUT_DURATION: 1000,
    SESSION_TIMEOUT: 10000,
    STORAGE_KEY_PREFIX: 'auth_session_',
    ATTEMPTS_KEY_PREFIX: 'auth_attempts_',
    LOCKOUT_KEY_PREFIX: 'auth_lockout_',
    TIMESTAMP_KEY_PREFIX: 'auth_timestamp_',
  }
}));

describe('PinGuard Security', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('PREVENTS bypass when sessionStorage is set to "true"', () => {
    const target = 'test_target_bypass';
    // Attempt the old exploit
    sessionStorage.setItem(`auth_session_${target}`, 'true');
    sessionStorage.setItem(`auth_timestamp_${target}`, Date.now().toString());

    render(
      <PinGuard target={target}>
        <div data-testid="protected-content">Secret Content</div>
      </PinGuard>
    );

    // Should NOT be in document
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('ALLOWS access when sessionStorage is set to correct hash', async () => {
    const target = 'test_target_valid';
    // Simulate valid login state
    sessionStorage.setItem(`auth_session_${target}`, MOCK_PIN_HASH);
    sessionStorage.setItem(`auth_timestamp_${target}`, Date.now().toString());

    render(
      <PinGuard target={target}>
        <div data-testid="protected-content">Secret Content</div>
      </PinGuard>
    );

    // Should be in document after useEffect runs
    await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });
  });

  it('DENIES access when sessionStorage is set to incorrect hash', () => {
    const target = 'test_target_invalid';
    // Simulate invalid hash
    sessionStorage.setItem(`auth_session_${target}`, 'badhash');
    sessionStorage.setItem(`auth_timestamp_${target}`, Date.now().toString());

    render(
      <PinGuard target={target}>
        <div data-testid="protected-content">Secret Content</div>
      </PinGuard>
    );

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });
});
