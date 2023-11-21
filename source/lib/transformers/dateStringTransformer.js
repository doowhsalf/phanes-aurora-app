import t from 'tcomb-form'
import moment from 'moment'

const DateStringTransformer = function (formatString) {

  return {
    format: (value) => {
      if (t.Date.is(value)) {
        let momentDate = moment(value);
        return momentDate.format(formatString);
      }
      return value;
    },
    parse: (str) => {
      "use strict";
      return str ? moment.parse(str).toDate() : null
    }
  }

};

export default DateStringTransformer;
