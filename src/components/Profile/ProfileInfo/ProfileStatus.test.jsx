import React from 'react';
import { create } from 'react-test-renderer'
import { t } from 'tar';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
    test('Status from props should be in the state', () => {
        const component = create(<ProfileStatus status='Hello!' />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('Hello!');
    });

    test('after creation <span> should be displayed', () => {
        const component = create(<ProfileStatus status='Hello!' />);
        const root = component.root;
        const span = root.findByType('span')
        expect(span).not.toBeNull();
    });

    test('after creation <input> should not be displayed', () => {
        const component = create(<ProfileStatus status='Hello!' />);
        const root = component.root;
        expect(() => {
            const input = root.findByType('input');
        }).toThrow();
    });

    test('after creation span should contains correct status', () => {
        const component = create(<ProfileStatus status='Hello!' />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0]).toBe('Hello!');
    });

    test('input should be displayed in editMode', () => {
        const component = create(<ProfileStatus status='Hello!' />);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onDoubleClick();
        const input = root.findByType('input');
        expect(input.props.value).toBe('Hello!');
    });

    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='Hello!' updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);

    });
})