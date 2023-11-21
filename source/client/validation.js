import t from 'tcomb-form'


export default class {


  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  /** String field with simple validation -
   * length has to be between min and max **/

  stringWithLength(name, min, max) {
    let errorMessage = (s) => {

      if (!s || s === null)
        s = '';

      console.log(`validating value ${s} for ${name} within ${min} ${max}`);

      if (min && max && this.isNumeric(min) && this.isNumeric(max)) {
        if (!s || !(s.length >= min && s.length <= max)) {
          return `${name} length (${s.length}) is invalid (${min} - ${max}).`;
        }
      }

      if (min && this.isNumeric(min)) {
        if (!s || s.length < min) {
          return `${name} length (${s.length}) is invalid (minimum ${min}).`;
        }
      }

      if (max && this.isNumeric(max)) {
        if (s && s.length > max) {
          return `${name} length (${s.length}) is invalid (maximum ${max}).`;
        }
      }

      return '';

    };
    var Subtype = t.subtype(t.String, function (x) {

      return errorMessage(x) == '';
    }, name);
    Subtype.getValidationErrorMessage = errorMessage;
    return Subtype;
  }

  requiredField(name) {
    let validation = (s) => {
      console.log(`validating value ${s} for required field ${name}`);
      if (!s) {
        return `${name} is required.`;
      }
    };

    var Subtype = t.subtype(t.String, function (x) {
      return !t.String.is(validation(x));
    }, name);
    Subtype.getValidationErrorMessage = validation;
    return Subtype;

  }


}


