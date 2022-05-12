import _ from 'lodash'

import all from './all'
import address from './address'
import store from './store/storelist'

export default _.merge(
    all,
    address,
    store
)