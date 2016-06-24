'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaPersonen from '../../components/filterFields/AreaPersonen'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const { interneOptions } = state.geschaefte
  const {
    values,
    change,
    nrOfFieldsBeforePersonen
  } = props

  return {
    values,
    interneOptions,
    change,
    nrOfFieldsBeforePersonen
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaPersonen)
