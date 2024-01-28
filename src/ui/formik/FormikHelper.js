import {getDeepValue, joinClassNames} from "../../helpers/utils";
import styles from './index.module.css'

class FormikHelper {
    constructor(errors, touched) {
        this.errors = errors;
        this.touched = touched;
    }

    formClassName(fieldName) {
        return joinClassNames(
            styles.form__field,
            (getDeepValue(this.errors, fieldName) && getDeepValue(this.touched, fieldName)) && styles.invalid
        );
    }

    formLabelName(fieldName) {
        return joinClassNames(
            styles.form__label,
            (getDeepValue(this.errors, fieldName) && getDeepValue(this.touched, fieldName)) && styles.invalid
        );
    }

    formInvalidName(fieldName){
        return getDeepValue(this.errors, fieldName) && getDeepValue(this.touched, fieldName) ? "is-invalid" : ''
    }

    createFunctions() {
        return {
            formClassName: this.formClassName.bind(this),
            formLabelName: this.formLabelName.bind(this),
            formInvalidName: this.formInvalidName.bind(this)
        }
    }
}

export default FormikHelper;