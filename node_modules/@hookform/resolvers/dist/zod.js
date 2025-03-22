import { appendErrors, transformToNestObject, } from 'react-hook-form';
import convertArrayToPathName from './utils/convertArrayToPathName';
const parseErrorSchema = (zodError, validateAllFieldCriteria) => {
    if (zodError.isEmpty) {
        return {};
    }
    return zodError.errors.reduce((previous, { path, message, code: type }) => {
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
    }, {});
};
export const zodResolver = (schema, options) => async (values, _, validateAllFieldCriteria = false) => {
    const result = schema.safeParse(values, options);
    if (result.success) {
        return { values: result.data, errors: {} };
    }
    return {
        values: {},
        errors: transformToNestObject(parseErrorSchema(result.error, validateAllFieldCriteria)),
    };
};
//# sourceMappingURL=zod.js.map