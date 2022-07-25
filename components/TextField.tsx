import React from 'react';
import MuiTextField from '@mui/material/TextField';
import {FieldAttributes} from "formik";
import get from "lodash/get";

const TextField = (props: FieldAttributes<any>) => {
    const {field, form, ...rest} = props;
    const {name} = field
    const { setFieldValue, setFieldTouched, touched, errors } = form;

    const onInputChange = React.useCallback(
        ({target: {value }}: any) => setFieldValue(name, value),
        [name, setFieldValue]);

    const onBlur = React.useCallback(() => setFieldTouched(name, true),
        [setFieldTouched, name]);

    const error = React.useMemo(() => get(touched, name) && !!get(errors, name),
        [name, touched, errors]);

    const errorMessage = React.useMemo(
        () => (get(touched, name) ? get(errors, name) : undefined),
        [name, touched, errors]
    );

    return (
        <>
            <MuiTextField
                size="small"
                error={error}
                name={name}
                id={name}
                {...field}
                {...rest}
                helperText={errorMessage}
                onBlur={onBlur}
                onChange={onInputChange}/>
        </>
    );
};

export default TextField;