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

)