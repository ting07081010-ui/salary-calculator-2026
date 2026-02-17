import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ClassCard from '../ClassCard';
import { TEACHER_TYPES } from '../../config/salaryConfig';

// @vitest-environment jsdom

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Trash2: () => <span data-testid="trash-icon">Trash</span>,
  User: () => <span>User</span>,
  Clock: () => <span>Clock</span>,
  TrendingUp: () => <span>TrendingUp</span>,
}));

// Mock formatters
vi.mock('../../utils/formatters', () => ({
  formatCurrency: (val) => String(val),
}));

describe('ClassCard Accessibility', () => {
  afterEach(() => {
    cleanup();
  });

  const mockUpdateClass = vi.fn();
  const mockRemoveClass = vi.fn();
  const defaultProps = {
    cls: {
      id: '1',
      type: 'regular',
      count: 10,
      maxStudents: 20,
      hours: 2,
      frequency: 'full',
      subTotal: 1000,
      hourlyRate: 500,
      info: 'Regular Class'
    },
    index: 0,
    teacherType: TEACHER_TYPES.PT,
    updateClass: mockUpdateClass,
    removeClass: mockRemoveClass,
  };

  it('has accessible label for delete button', () => {
    render(<ClassCard {...defaultProps} />);
    const deleteBtn = screen.getByRole('button', { name: /移除第 1 個班級/i });
    expect(deleteBtn).toBeDefined();
  });

  it('has accessible label for student count input', () => {
    render(<ClassCard {...defaultProps} />);
    const input = screen.getByRole('slider', { name: /第 1 個班級的學生人數/i });
    expect(input).toBeDefined();
  });

  it('has accessible label for class type select', () => {
    render(<ClassCard {...defaultProps} />);
    const select = screen.getByRole('combobox', { name: /第 1 個班級的類型/i });
    expect(select).toBeDefined();
  });

  it('has accessible label for hours input', () => {
    render(<ClassCard {...defaultProps} />);
    const input = screen.getByRole('spinbutton', { name: /第 1 個班級的每週時數/i });
    expect(input).toBeDefined();
  });

  it('has accessible state for frequency buttons', () => {
    render(<ClassCard {...defaultProps} />);
    const fullBtn = screen.getByRole('button', { name: /全期/i });
    const singleBtn = screen.getByRole('button', { name: /單日/i });

    expect(fullBtn.getAttribute('aria-pressed')).toBe('true');
    expect(singleBtn.getAttribute('aria-pressed')).toBe('false');
  });
});
