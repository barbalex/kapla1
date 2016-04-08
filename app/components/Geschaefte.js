'use strict'

import React, { Component, PropTypes } from 'react'
import ReactList from 'react-list'
import styles from './Geschaefte.css'

class Geschaefte extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefiltert: PropTypes.array.isRequired,
    fetchUsername: PropTypes.func.isRequired,
    username: PropTypes.string,
    holeDbAusConfig: PropTypes.func.isRequired,
    holenGeschaefte: PropTypes.func.isRequired,
    aktiviereGeschaeft: PropTypes.func.isRequired,
    activeId: PropTypes.number,
    holenRechtsmittelerledigungOptions: PropTypes.func.isRequired,
    holenParlVorstossTypOptions: PropTypes.func.isRequired,
    holenStatusOptions: PropTypes.func.isRequired,
    holenGeschaeftsartOptions: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {
      fetchUsername,
      holeDbAusConfig,
      holenGeschaefte,
      holenRechtsmittelerledigungOptions,
      holenParlVorstossTypOptions,
      holenStatusOptions,
      holenGeschaeftsartOptions
    } = this.props

    fetchUsername()
    holeDbAusConfig()
    holenGeschaefte()
    holenRechtsmittelerledigungOptions()
    holenParlVorstossTypOptions()
    holenStatusOptions()
    holenGeschaeftsartOptions()
  }

  onClickGeschaeft(idGeschaeft) {
    const { aktiviereGeschaeft } = this.props
    aktiviereGeschaeft(idGeschaeft)
  }

  renderItem(index, key) {
    const { geschaefteGefiltert, activeId } = this.props
    const isActive = activeId && activeId === geschaefteGefiltert[index].idGeschaeft
    const trClassName = isActive ? [styles.bodyRow, styles.active].join(' ') : styles.bodyRow
    const geschaeft = geschaefteGefiltert[index]
    const fristMitarbeiter = geschaeft.fristMitarbeiter ? `Frist: ${geschaeft.fristMitarbeiter}` : null

    return (
      <div
        key={key}
        className={trClassName}
        onClick={this.onClickGeschaeft.bind(this, geschaeft.idGeschaeft)}
      >
        <div className={[styles.columnIdGeschaeft, styles.bodyCell].join(' ')}>
          <div>
            {geschaeft.idGeschaeft}
          </div>
        </div>
        <div className={[styles.columnGegenstand, styles.bodyCell].join(' ')}>
          <div className={styles.fieldGegenstand}>
            {geschaeft.gegenstand}
          </div>
          <div>
            {geschaeft.details}
          </div>
        </div>
        <div className={[styles.columnStatus, styles.bodyCell].join(' ')}>
          <div>
            {geschaeft.status}
          </div>
          <div>
            {fristMitarbeiter}
          </div>
          <div>
            {geschaeft.faelligkeitText}
          </div>
        </div>
        <div className={[styles.columnKontaktIntern, styles.bodyCell].join(' ')}>
          <div>
            {geschaeft.idKontaktIntern}
          </div>
          <div>
            {geschaeft.kontaktInternVornameName}
          </div>
        </div>
      </div>
    )
  }

  renderItems(items, ref) {
    return (
      <div ref={ref} className={styles.table}>
        {items}
      </div>
    )
  }

  render() {
    /**
     * class 'reactList' is needed to
     * apply ::-webkit-scrollbar: display: none;
     */
    const { geschaefteGefiltert } = this.props
    return (
      <div className={styles.body}>
        <div className={[styles.listElement, 'reactList'].join(' ')}>
          <ReactList
            itemRenderer={::this.renderItem}
            length={geschaefteGefiltert.length}
            type="variable"
          />
        </div>
      </div>
    )
  }
}

export default Geschaefte
