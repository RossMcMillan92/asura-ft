/* globals jest */
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import config from './next.config'
import { setConfig as setNextConfig } from 'next/config'

delete global.window.location
global.window.location = new URL('https://localhost')

global.process.browser = true

Enzyme.configure({ adapter: new Adapter() })

setNextConfig(config)
