/**
 * @jest-environment jsdom
 */

import { setupContainer, breakdown, basicConfig } from './setup'

describe('accessibility suite', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    afterEach(() => {
        breakdown()
    })

    it('input autocomplete should be off', () => {
        const { $input } = setupContainer(basicConfig)
        expect($input.hasAttribute('autocomplete', 'off')).toBe(true)
    })

    it('input aria expanded should be false', () => {
        const { $input } = setupContainer(basicConfig)
        expect($input.hasAttribute('aria-expanded', 'false')).toBe(true)
    })

    it('input role of combo box', () => {
        const { $input } = setupContainer(basicConfig)
        expect($input.hasAttribute('role', 'combobox')).toBe(true)
    })

    it('input role of combo box', () => {
        const { $input } = setupContainer(basicConfig)
        expect($input.hasAttribute('role', 'combobox')).toBe(true)
    })

    it('input aria-owns the correct modal', () => {
        const { container, $input } = setupContainer(basicConfig)
        const listId = $input.getAttribute('aria-owns')

        // query that id
        const listEl = container.querySelector(`#${listId}`)

        expect(listEl).toBeTruthy()
    })

    it('input has popup of listbox', () => {
        const { $input } = setupContainer(basicConfig)
        expect($input.hasAttribute('aria-haspopup', 'listbox')).toBe(true)
    })

    it('input should have aria-describedby and area should exist', () => {
        const { $input, container } = setupContainer(basicConfig)
        const hintId = $input.getAttribute('aria-describedby')
        // query that id
        const hintEl = container.querySelector(`#${hintId}`)
        expect(hintEl).toBeTruthy()
    })

    it('autocomplete list should have role listbox', () => {
        const { container, $input } = setupContainer(basicConfig)
        const listId = $input.getAttribute('aria-owns')

        // query that id
        const listEl = container.querySelector(`#${listId}`)
        expect(listEl.hasAttribute('role', 'listbox')).toBe(true)
    })
})
