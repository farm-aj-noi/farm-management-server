import allin from './mutation'
import _ from 'lodash'

import status from './status'
import imslaughter from './imslaughter'
import beeftype from './beeftype'
import user from './user'
import setting from './setting'
import halve from './halve'
import quarter from './quarter'
import lump from './lump'
import chop from './chop'
import entrail from './entrail'
import feed from './feed'
import treat from './treat'
import transport from './transport'
import drug from './Raise/drug'
import disease from './Raise/disease'
import datacow from '../mutationcow/cow'
import datatreat from '../mutationcow/treatcow'
import beefstore from '../mutationstore/beefstore'
import imhalve from '../mutationstore/imhalve'
import imquarter from '../mutationstore/imquarter'
import imlump from '../mutationstore/imlump'
import imchop from '../mutationstore/imchop'
import imentrail from '../mutationstore/imentrail'
import chill from '../mutationstore/chill'
import chillroom from '../mutationstore/chillroom'
import beefroom from '../mutationstore/beefroom'
import entrailstore from '../mutationstore/entrailstore'
import requestexport from '../mutationstore/requestexport'
import typekeep from '../mutationstore/typekeep'
import shelf from '../mutationstore/shelf'
import Chillday from '../mutationstore/chillday'
import Basket from '../mutationstore/basket'
import ExpdateSetting from '../mutationstore/expdatesetting'
import TotalExpdate from '../mutationstore/totalexpdate'
import Producttype from '../mutationproduct/producttype'
import Unit from '../mutationproduct/unit'
import Beefproduct from '../mutationproduct/beefproduct'
import ProductStore from '../mutationproduct/productstore'
import Improduct from '../mutationproduct/improduct'
import Productroom from '../mutationproduct/productroom'
import Freezer from '../mutationproduct/freezer'
import Pbasket from '../mutationproduct/pbasket'
import Typekeep2 from '../mutationproduct/typekeep2'
import ExpdateSetting2 from '../mutationproduct/expdatesetting2'
import ProductTransport from '../mutationproduct/producttransport'
import RequestExportP from '../mutationproduct/requestexportp'

export default _.merge(
    allin,
    status,
    imslaughter,
    beeftype,
    halve,
    quarter,
    lump,
    chop,
    entrail,
    feed,
    treat,
    transport,
    drug,
    disease,
    user,
    setting,
    ////////////////////////////// chine ////////
    datacow,
    datatreat,
    ////////////////////////////// kim,pak,yiw ////////
    beefstore,
    imhalve,
    imquarter,
    imlump,
    imchop,
    imentrail,
    chill,
    chillroom,
    beefroom,
    entrailstore,
    requestexport,
    typekeep,
    shelf,
    Chillday,
    Basket,
    ExpdateSetting,
    TotalExpdate,
    Producttype,
    Unit,
    Beefproduct,
    ProductStore,
    Improduct,
    Productroom,
    Freezer,
    Pbasket,
    Typekeep2,
    ExpdateSetting2,
    ProductTransport,
    RequestExportP
)