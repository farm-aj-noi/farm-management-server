import _ from 'lodash'

import all from './all'
import address from './address'
import store from './store/storelist'
import productstore from './store/productlist'
import beefgrading from './beefgrading/list'

export default _.merge(
    all,
    address,
    store,
    productstore,
    beefgrading
)