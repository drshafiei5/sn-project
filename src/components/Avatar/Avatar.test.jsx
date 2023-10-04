import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '../../test.utils';
import Avatar from './index';

describe('Avatar', () => {
  describe('with no image src', () => {
    let props;
    beforeEach(() => {
      props = {
        avatarSrc: '',
        name: 'Martin',
        bgColor: 'rgb(0, 128, 0)',
        textColor: 'white',
        size: 40
      };
    });

    test('should render div with background color', () => {
      render(<Avatar {...props} />);
      const divElement = screen.getByTestId('avatar-container');
      const divElementStyles = window.getComputedStyle(divElement);
      expect(divElementStyles.backgroundColor).toBe('rgb(0, 128, 0)');
      expect(divElementStyles.width).toBe('40px');
      expect(divElementStyles.height).toBe('40px');
    });

    test('should have first letter of name', () => {
      render(<Avatar {...props} />);
      const avatarNameElement = screen.getByTestId('avatar-name');
      const avatarNameElementStyles = window.getComputedStyle(avatarNameElement);
      expect(avatarNameElement.textContent).toBe('M');
      expect(avatarNameElementStyles.textTransform).toBe('uppercase');
    });
  });

  describe('with image src', () => {
    let props;
    beforeEach(async () => {
      props = {
        avatarSrc: 'https://place-hold.it/40',
        name: 'Martin',
        bgColor: 'green',
        textColor: 'white',
        size: 40
      };
    });

    test('should render img', () => {
      render(<Avatar {...props} />);
      const imgElement = screen.getByRole('img');
      expect(imgElement).toBeInTheDocument();
    });

    test('should have image src', () => {
      render(<Avatar {...props} />);
      const imgElement = screen.getByRole('img');
      expect(imgElement).toHaveAttribute('src', 'https://place-hold.it/40');
    });
  });
});