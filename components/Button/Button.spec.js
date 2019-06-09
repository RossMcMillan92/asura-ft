import { mount, shallow } from 'enzyme'

import Button from './Button'
import React from 'react'

const content = 'Text'
const getWrapper = props => mount(<Button {...props}>{content}</Button>)
const getShallowWrapper = props =>
  shallow(<Button {...props}>{content}</Button>)

describe('Button', () => {
  it('matches the snapshot', () => {
    const wrapper = getShallowWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  it('renders the content', () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toEqual(content)
  })

  describe('when a theme prop is passed', () => {
    it('appends a modifier class as the theme', () => {
      const theme = 'bare'
      const wrapper = getWrapper({ theme })
      expect(wrapper.find('button').prop('className')).toContain(
        `button button--${theme}`
      )
    })
  })

  describe('when a className prop is passed', () => {
    it('appends the class to the className', () => {
      const className = 'additional-styling'
      const wrapper = getWrapper({ className })
      expect(wrapper.find('button').prop('className')).toContain(
        `button ${className}`
      )
    })
  })

  describe('when arbitrary props are passed', () => {
    it('appends the props the element', () => {
      const tabIndex = '-1'
      const wrapper = getWrapper({ tabIndex })
      expect(wrapper.find('button').prop('tabIndex')).toContain(tabIndex)
    })
  })
})
