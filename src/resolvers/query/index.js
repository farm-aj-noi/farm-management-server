import _ from 'lodash'

import all from './all'
import address from './address'
import store from './store/storelist'
import productstore from './store/productlist'

export default _.merge(
    all,
    address,
    store,
    productstore
)