import { describe, expect, test } from 'vitest';

import Sidebar from './index';
import { sideBarItems } from '../../services/utils/static.data';
import { fireEvent, render, screen, waitFor, within } from '../../test.utils';

describe('Sidebar', () => {
    test('should have its list elements', () => {
        render(<Sidebar />);
        const listElement = screen.getByRole('list');
        const { getAllByRole } = within(listElement);
        const items = getAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
    });

    test('should change url when clicked', async () => {
        render(<Sidebar />);
        const listItem = screen.getAllByTestId('sidebar-list');
        fireEvent.click(listItem[1]);
        const url = sideBarItems[1].url;
        await waitFor(() => expect(window.location.pathname).toEqual(url));
    });

    test('should have active class on selected item', async () => {
        render(<Sidebar />);
        const listItem = screen.getAllByTestId('sidebar-list');
        fireEvent.click(listItem[1]);
        await waitFor(() => expect(listItem[1]).toHaveClass('active'));
    });
});
