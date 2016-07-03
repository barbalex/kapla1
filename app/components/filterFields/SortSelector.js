import React, { PropTypes } from 'react'
import {
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import styles from './sortSelector.css'

const SortSelector = ({
  name,
  filterFields,
  changeComparator,
}) => {
  const filterField = filterFields.find((ff) => ff.field === name)
  const comparatorValue = filterField ? filterField.comparator : ''

  return (
    <InputGroup.Button>
      <FormControl
        componentClass="select"
        className={styles.sortSelector}
        onChange={(e) => changeComparator(e.target.value, name)}
        value={comparatorValue}
      >
        <option value=""></option>
        <option value="ASCENDING">&#8679;</option>
        <option value="DESCENDING">&#8681;</option>
      </FormControl>
    </InputGroup.Button>
  )
}

SortSelector.displayName = 'SortSelector'

SortSelector.propTypes = {
  name: PropTypes.string.isRequired,
  filterFields: PropTypes.array.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default SortSelector
