'use strict'

import React, { Component } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import FilterFields from '../containers/filterFields/FilterFields'
import Geschaefte from '../containers/Geschaefte'
import saveConfigValue from '../src/saveConfigValue'
import getConfig from '../src/getConfig.js'

class GeschaefteLayout extends Component {
  state = {
    geschaefteLayout: null
  }

  componentDidMount = () => {
    let { geschaefteLayout } = this.state
    const layoutConfig = {
      settings: {
        hasHeaders: false,
        reorderEnabled: false,
        showPopoutIcon: false,
        showCloseIcon: false
      },
      labels: {
        maximise: 'Breite maximieren',
        minimise: 'Breite zurücksetzen'
      },
      content: [{
        type: 'row',
        content: [
          {
            type: 'react-component',
            component: 'geschaefte',
            title: 'Geschäfte'
          },
          {
            type: 'react-component',
            component: 'filterFields',
            title: 'Filtern nach Feldern'
          }
        ]
      }]
    }
    const savedState = getConfig().geschaefteLayoutState
    if (savedState) {
      geschaefteLayout = new GoldenLayout(savedState)
    } else {
      geschaefteLayout = new GoldenLayout(layoutConfig)
    }
    geschaefteLayout.registerComponent('geschaefte', wrapComponentInProvider(Geschaefte))
    geschaefteLayout.registerComponent('filterFields', wrapComponentInProvider(FilterFields, geschaefteLayout))
    geschaefteLayout.init()
    this.setState({ geschaefteLayout })
    geschaefteLayout.on('stateChanged', () =>
      this.saveGeschaefteState()
    )
  }

  componentWillUnmount = () => {
    const { geschaefteLayout } = this.state
    geschaefteLayout.destroy()
  }

  saveGeschaefteState = () => {
    const { geschaefteLayout } = this.state
    saveConfigValue('geschaefteLayoutState', geschaefteLayout.toConfig())
  }

  render = () => <div></div>
}

export default GeschaefteLayout
