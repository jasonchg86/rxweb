import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { NumericConfig } from "../models/config/numeric-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";
import {NumericValueType } from '../enums'


export function numericValidator(config: NumericConfig, conditionalValidationProps:string[]): ValidatorFn {


    
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpression, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                if (!RegexValidator.isValid(controlValue, ApplicationUtil.numericValidation(config.allowDecimal,config.acceptValue)))
                    return ObjectMaker.toJson(AnnotationTypes.numeric, config.message || null, [controlValue]);
            }
        } return ObjectMaker.null();
    }
}
