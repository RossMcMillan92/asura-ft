import { mount, shallow } from 'enzyme'

import AddTodoForm from './AddTodoForm'
import React from 'react'
import { act } from 'react-dom/test-utils'

const props = {
  onSubmit: jest.fn()
}
const getWrapper = additionalProps =>
  mount(<AddTodoForm {...props} {...additionalProps} />)
const getShallowWrapper = additionalProps =>
  shallow(<AddTodoForm {...props} {...additionalProps} />)

describe('AddTodoForm', () => {
  it('matches the snapshot', () => {
    const wrapper = getShallowWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  describe('when submitted', () => {
    describe('when the text field is empty', () => {
      it('does not call the on submit prop', () => {
        const wrapper = getWrapper()
        act(() => {
          wrapper.find('form').simulate('submit')
        })
        expect(props.onSubmit).not.toBeCalled()
      })
    })

    describe('when the text field is filled', () => {
      const wrapper = getWrapper()
      const value = '   To do task... '

      beforeAll(() => {
        act(() => {
          wrapper.find('input').simulate('change', { target: { value } })
        })
        wrapper.update()

        // Ensure the value is in the text entry before later checking it's cleared
        expect(wrapper.find('input').prop('value')).toBe(value)

        act(() => {
          wrapper.find('form').simulate('submit')
        })
        wrapper.update()
      })

      it('calls the onSubmit prop, passing the trimmed value', () => {
        expect(props.onSubmit).toBeCalledWith(value.trim())
      })

      it('clears the text field', () => {
        expect(wrapper.find('input').prop('value')).toBe('')
      })
    })
  })
})
