'use strict'

import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import styles from './Geschaefte.css'

const getDauerBisFristMitarbeiter = (geschaeft) => {
  if (!geschaeft.fristMitarbeiter) return null
  const now = moment()
  const end = moment(geschaeft.fristMitarbeiter, 'DD.MM.YYYY')
  const duration = moment.duration(end.diff(now))
  const days = duration.asDays()
  return days ? Math.ceil(days) : ''
}

const getStatusFristInText = (dauerBisFristMitarbeiter) => {
  if (dauerBisFristMitarbeiter < 0) return 'Überfällig'
  if (dauerBisFristMitarbeiter === 0) return 'Heute'
  if (dauerBisFristMitarbeiter === 1) return `In ${dauerBisFristMitarbeiter} Tag`
  return `In ${dauerBisFristMitarbeiter} Tagen`
}

const getStatusFristInStyle = (statusFristInText) => {
  if (statusFristInText === 'Überfällig') return styles.fieldFristInUeberfaellig
  if (statusFristInText === 'Heute') return styles.fieldFristInHeute
  return null
}

class GeschaefteItem extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    geschaeftToggleActivated: PropTypes.func.isRequired,
    activeId: PropTypes.number,
    path: PropTypes.string.isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    index: PropTypes.number.isRequired,
    keyPassed: PropTypes.number.isRequired
  }

  render() {
    const {
      geschaefte,
      geschaefteGefilterteIds,
      activeId,
      path,
      router,
      geschaeftToggleActivated,
      index,
      keyPassed
    } = this.props
    const isActive = activeId && activeId === geschaefteGefilterteIds[index]
    const trClassName = (
      isActive ?
      [styles.tableBodyRow, styles.active].join(' ') :
      styles.tableBodyRow
    )
    const geschaeft = geschaefte.find((g) =>
      g.idGeschaeft === geschaefteGefilterteIds[index]
    )
    const fristMitarbeiter = (
      geschaeft.fristMitarbeiter ?
      `Frist: ${geschaeft.fristMitarbeiter}` :
      ''
    )
    const dauerBisFristMitarbeiter = getDauerBisFristMitarbeiter(geschaeft)
    const statusFristInText = getStatusFristInText(dauerBisFristMitarbeiter)
    const statusFristIn = geschaeft.fristMitarbeiter ? statusFristInText : null

    return (
      <div
        key={keyPassed}
        className={trClassName}
        onClick={() => {
          // if path is not '/geschaefte', make it that
          // because this is also called from '/fieldFilter'
          // TODO: Error router is undefined?????
          if (path !== '/geschaefte') {
            router.push('/geschaefte')
          }
          geschaeftToggleActivated(geschaeft.idGeschaeft)
        }}
      >
        <div className={styles.columnIdGeschaeft}>
          <div>
            {geschaeft.idGeschaeft}
          </div>
        </div>
        <div className={styles.columnGegenstand}>
          <div className={styles.fieldGegenstand}>
            {geschaeft.gegenstand}
          </div>
          {/*
            <div>
              {geschaeft.details}
            </div>
          */}
        </div>
        <div className={styles.columnStatus}>
          <div>
            {geschaeft.status}
          </div>
          <div>
            {fristMitarbeiter}
          </div>
          <div className={getStatusFristInStyle(statusFristInText)}>
            {statusFristIn}
          </div>
        </div>
        <div className={styles.columnKontaktIntern}>
          <div>
            {geschaeft.verantwortlichVornameName}
          </div>
          <div>
            {geschaeft.verantwortlich}
          </div>
        </div>
      </div>
    )
  }
}

export default GeschaefteItem
