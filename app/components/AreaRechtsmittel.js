'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styles from './AreaRechtsmittel.css'
import createOptions from '../src/createOptions'

class AreaRechtsmittel extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    rechtsmittelErledigungOptions: PropTypes.array.isRequired,
    rechtsmittelInstanzOptions: PropTypes.array.isRequired,
    nrOfFieldsBeforePv: PropTypes.number,
    change: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired
  }

  render = () => {
    const { geschaeft, rechtsmittelErledigungOptions, rechtsmittelInstanzOptions, nrOfFieldsBeforePv, change, blur } = this.props
    return (
      <div className={styles.areaForGeschaeftsart}>
        <div className={styles.areaRechtsmittelTitle}>Rekurs / Beschwerde</div>
        <div className={styles.fieldInstanz}>
          <ControlLabel>Instanz</ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.rechtsmittelInstanz || ''}
            name="rechtsmittelInstanz"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={1 + nrOfFieldsBeforePv}
          >
            {createOptions(rechtsmittelInstanzOptions)}
          </FormControl>
        </div>
        <div className={styles.fieldErledigung}>
          <ControlLabel>Erledigung</ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.rechtsmittelErledigung || ''}
            name="rechtsmittelErledigung"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={2 + nrOfFieldsBeforePv}
          >
            {createOptions(rechtsmittelErledigungOptions)}
          </FormControl>
        </div>
      </div>
    )
  }
}

export default AreaRechtsmittel
