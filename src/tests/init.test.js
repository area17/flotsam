/**
 * @jest-environment jsdom
 */

import { setupContainer, breakdown, basicConfig } from './setup'
import flotsom from './../index'

describe('initalitize suite', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    afterEach(() => {
        breakdown()
    })

    it('expect flotsom to fail without any config', () => {
        try {
            setupContainer({})
            expect(true).toBe(false)
        } catch (e) {
            // im an error
            expect(true).toBe(true)
        }
    })

    it('expect modal exists after init', () => {
        const { container } = setupContainer(basicConfig)
        const modal = container.querySelector('.flotsam-modal')
        expect(modal).toBeTruthy()
    })

    it('expect modal to have all the right parts', () => {
        const { container } = setupContainer(basicConfig)
        const modal = container.querySelector('.flotsam-modal')
        expect(modal.querySelector('.flotsam-modal__list')).toBeTruthy()
        expect(modal.querySelector('.flotsam-modal__empty')).toBeTruthy()
    })

    it('expect two copies exist if two are initialized', () => {
        breakdown()
        const dummyData = { data: ['one', 'two', 'three', 'four'] }
        const container = document.createElement('div')
        container.innerHTML = `
            <div>
                <input class="input-1" />
                <input class="input-2" />
            </div>`

        const $input1 = container.querySelector('.input-1')
        const $input2 = container.querySelector('.input-2')
        new flotsom({ data: dummyData, el: $input1 })
        new flotsom({ data: dummyData, el: $input2 })
        const modals = [...container.querySelectorAll('.flotsam-modal')]
        expect(modals.length).toBe(2)

        // also expect they have different and correct ids
        modals.forEach((modal) => {
            const listEl = modal.querySelector('.flotsam-modal__list')
            const id = listEl.id
            const input = container.querySelector(`[aria-owns="${id}"]`)
            expect(input).toBeTruthy()
        })
    })
})
