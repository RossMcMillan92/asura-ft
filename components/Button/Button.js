import './button.scss'

import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const BARE_THEME = 'bare'

const Button = ({ children, className, theme, ...otherProps }) => (
  <button
    {...otherProps}
    className={classnames('button', { [`button--${theme}`]: theme }, className)}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  theme: PropTypes.oneOf([BARE_THEME])
}

export default Button
