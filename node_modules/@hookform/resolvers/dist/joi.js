import { appendErrors, transformToNestObject, } from 'react-hook-form';
import convertArrayToPathName from './utils/convertArrayToPathName';
const parseErrorSchema = (error, validateAllFieldCriteria) => Array.isArray(error.details)
    ? error.details.reduce((previous, { path, message = '', type }) => {
        const currentPath = convertArrayToPathName(path);
        return Object.assign(Object.assign({}, previous), (path
            ? previous[currentPath] && validateAllFieldCriteria
                ? {
                    [currentPath]: appendErrors(currentPath, validateAllFieldCriteria, previous, type, message),
                }
                : {
                    [currentPath]: previous[currentPath] || Object.assign({ message,
                        type }, (validateAllFieldCriteria
                        ? {
                            types: { [type]: message || true },
                        }
                        : {})),
                }
            : {}));
    }, {})
    : [];
export const joiResolver = (schema, options = {
    abortEarly: false,
}) => async (values, _, validateAllFieldCriteria = false) => {
    try {
        return {
            values: await schema.validateAsync(values, Object.assign({}, options)),
            errors: {},
        };
    }
    catch (e) {
        return {
            values: {},
            errors: transformToNestObject(parseErrorSchema(e, validateAllFieldCriteria)),
        };
    }
};
//# sourceMappingURL=joi.js.map