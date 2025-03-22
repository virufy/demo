import { appendErrors, transformToNestObject, } from 'react-hook-form';
import { validate } from 'superstruct';
import convertArrayToPathName from './utils/convertArrayToPathName';
const parseErrorSchema = (error, validateAllFieldCriteria) => error
    .failures()
    .reduce((previous, { path, message = '', type }) => {
    const currentPath = convertArrayToPathName(path);
    return Object.assign(Object.assign({}, previous), (path
        ? previous[currentPath] && validateAllFieldCriteria
            ? {
                [currentPath]: appendErrors(currentPath, validateAllFieldCriteria, previous, type || '', message),
            }
            : {
                [currentPath]: previous[currentPath] || Object.assign({ message,
                    type }, (validateAllFieldCriteria
                    ? {
                        types: { [type || '']: message || true },
                    }
                    : {})),
            }
        : {}));
}, {});
export const superstructResolver = (schema, options) => (values, _, validateAllFieldCriteria = false) => {
    const [errors, result] = validate(values, schema, options);
    if (errors != null) {
        return {
            values: {},
            errors: transformToNestObject(parseErrorSchema(errors, validateAllFieldCriteria)),
        };
    }
    return {
        values: result,
        errors: {},
    };
};
//# sourceMappingURL=superstruct.js.map