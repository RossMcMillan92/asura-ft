import { mount, shallow } from 'enzyme'

import CheckboxInput from './CheckboxInput'
import React from 'react'
import { act } from 'react-dom/test-utils'

const props = {
  checked: false,
  id: 'checkbox-id',
  name: 'checkbox-name',
  onChange: jest.fn(),
  value: 'value'
}
const getWrapper = additionalProps =>
  mount(<CheckboxInput {...props} {...additionalProps} />)
const getShallowWrapper = additionalProps =>
  shallow(<CheckboxInput {...props} {...additionalProps} />)

describe('CheckboxInput', () => {
  it('matches the snapshot', () => {
    const wrapper = getShallowWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  describe('when changed', () => {
    it('calls the passed onChange prop', () => {
      const wrapper = getWrapper()
      act(() => {
        wrapper.find('input').simulate('change')
      })
      expect(props.onChange).toBeCalled()
    })
  })

  describe('when the prop checked is passed as true', () => {
    const checked = true
    const wrapper = getWrapper({ checked })

    it('sets the input to checked', () => {
      expect(wrapper.find('input').prop('checked')).toBe(checked)
    })

    it('appends the is-checked class to the className', () => {
      expect(wrapper.find('.checkbox-input').prop('className')).toContain(
        `checkbox-input is-checked`
      )
    })
  })

  describe('when a className prop is passed', () => {
    it('appends the class to the className', () => {
      const className = 'additional-styling'
      const wrapper = getWrapper({ className })
      expect(wrapper.find('.checkbox-input').prop('className')).toContain(
        `checkbox-input ${className}`
      )
    })
  })
})
