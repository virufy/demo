import { transformToNestObject } from 'react-hook-form';
const promisify = (validatorFn) => (...args) => new Promise((resolve) => validatorFn(...args).done(resolve));
const parseErrorSchema = (vestError, validateAllFieldCriteria) => {
    return Object.entries(vestError).reduce((prev, [key, value]) => {
        return Object.assign(Object.assign({}, prev), { [key]: Object.assign({ type: '', message: value[0] }, (validateAllFieldCriteria
                ? {
                    types: value.reduce((prev, message, index) => {
                        return Object.assign(Object.assign({}, prev), { [index]: message });
                    }, {}),
                }
                : {})) });
    }, {});
};
export const vestResolver = (schema, _ = {}, validateAllFieldCriteria = false) => async (values) => {
    const validateSchema = promisify(schema);
    const result = await validateSchema(values);
    const errors = result.getErrors();
    if (!result.hasErrors()) {
        return { values: values, errors: {} };
    }
    return {
        values: {},
        errors: transformToNestObject(parseErrorSchema(errors, validateAllFieldCriteria)),
    };
};
//# sourceMappingURL=vest.js.map