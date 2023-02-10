import flotsom from './../index'

const basicConfig = {
    data: ['foo', 'bar', 'foobar', 'yoooo', 'yoooooooo'],
}

const setupInput = () => {
    const div = document.createElement('div')
    div.innerHTML = `<div><input /></div>`
    return div
}

const setupContainer = (config = {}) => {
    const container = setupInput()
    const $input = container.querySelector('input')
    const typeahead = new flotsom({ ...config, el: $input })
    return { container, typeahead, $input }
}

const breakdown = () => {
    document.body.innerHTML = ''
}

export { setupInput, setupContainer, breakdown, basicConfig }
