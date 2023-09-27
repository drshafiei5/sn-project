import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '../../test.utils';
import Button from '.';

describe('Button test', () => {
    test('should be disabled', () => {
        render(<Button label="Send" disabled={true} className="button" />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();
    });

    test('should be enabled', () => {
        render(<Button label="Send" disabled={false} className="button" />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeEnabled();
    });

    test('should have label', () => {
        render(<Button label="Send" className="button" />);
        const buttonText = screen.getByText(/send/i);
        expect(buttonText).toBeInTheDocument();
    });

    test('should handle click', () => {
        const onClick = vi.fn();
        render(<Button label="Send" className="button" disabled={false} handleClick={onClick} />);
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
