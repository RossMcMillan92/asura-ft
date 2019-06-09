import { mount, shallow } from 'enzyme'

import React from 'react'
import TextInput from './TextInput'
import { act } from 'react-dom/test-utils'

const props = {
  id: 'text-input-id',
  label: 'Text input label',
  name: 'text-input-name',
  onChange: jest.fn()
}
const getWrapper = additionalProps =>
  mount(<TextInput {...props} {...additionalProps} />)
const getShallowWrapper = additionalProps =>
  shallow(<TextInput {...props} {...additionalProps} />)

describe('TextInput', () => {
  it('matches the snapshot', () => {
    const wrapper = getShallowWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  it('adds an aria-label tag to the input', () => {
    const wrapper = getWrapper()
    expect(wrapper.find('input').prop('aria-label')).toBe(props.label)
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

  describe('when a className prop is passed', () => {
    it('appends the class to the className', () => {
      const className = 'additional-styling'
      const wrapper = getWrapper({ className })
      expect(wrapper.find('.text-input').prop('className')).toContain(
        `text-input ${className}`
      )
    })
  })
})
