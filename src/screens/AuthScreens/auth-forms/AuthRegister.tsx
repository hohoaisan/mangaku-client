import React from 'react';
import {VStack, FormControl, Input, Text, Button} from 'native-base';

import {Formik} from 'formik';
import * as Yup from 'yup';

import AuthService from 'services/auth.service';

import {RegisterApiProps} from 'types/apis';

import strings from 'configs/strings';
const {buttons: buttonStrings} = strings;
const {
  forms: {labels, validations: validateStrings},
} = strings;

const registerInitValue: RegisterApiProps & {
  submit: string | null;
} = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  submit: null,
};

const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, validateStrings.nameValid.replace('$number', '3'))
    .max(255)
    .required(validateStrings.nameRequired),
  email: Yup.string()
    .email(validateStrings.emailValid)
    .max(255)
    .required(validateStrings.emailRequired),
  password: Yup.string()
    .min(8)
    .max(255)
    .required(validateStrings.passwordRequired),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], validateStrings.passwordMustMatch)
    .min(8)
    .max(255)
    .required(validateStrings.confirmPasswordRequired),
});

type AuthRegisterProps = {
  onSuccess?: () => void;
  onFailed?: () => void;
};

export default function AuthRegister({
  onSuccess,
  onFailed,
}: AuthRegisterProps): JSX.Element {
  return (
    <Formik
      initialValues={registerInitValue}
      validationSchema={registerValidationSchema}
      onSubmit={async (
        values,
        {resetForm, setErrors, setStatus, setSubmitting},
      ) => {
        try {
          const {name, email, password, confirmPassword} = values;
          await AuthService.register({name, email, password, confirmPassword});
          setStatus({success: true});
          setSubmitting(false);
          resetForm();
          onSuccess && onSuccess();
        } catch (err) {
          setStatus({success: false});
          if ((err as Error).message) {
            console.log((err as Error).message);
            setErrors({submit: (err as Error).message});
          }
          setSubmitting(false);
          onFailed && onFailed();
        }
      }}>
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>{labels.name}</FormControl.Label>
            <Input
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {touched.name && errors.name && (
              <FormControl.HelperText>
                <Text color="error.500" fontSize="xs">
                  {errors.name}
                </Text>
              </FormControl.HelperText>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label>{labels.email}</FormControl.Label>
            <Input
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {touched.email && errors.email && (
              <FormControl.HelperText>
                <Text color="error.500" fontSize="xs">
                  {errors.email}
                </Text>
              </FormControl.HelperText>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label>{labels.password}</FormControl.Label>
            <Input
              type="password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {touched.password && errors.password && (
              <FormControl.HelperText>
                <Text color="error.500" fontSize="xs">
                  {errors.password}
                </Text>
              </FormControl.HelperText>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label>{labels.confirmPassword}</FormControl.Label>
            <Input
              type="password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <FormControl.HelperText>
                <Text color="error.500" fontSize="xs">
                  {errors.confirmPassword}
                </Text>
              </FormControl.HelperText>
            )}
          </FormControl>
          {errors.submit && (
            <Text color="error.500" textAlign="center">
              {errors.submit}
            </Text>
          )}
          <Button
            mt="2"
            colorScheme="primary"
            onPress={() => handleSubmit()}
            bg={isSubmitting ? 'gray.200' : undefined}
            disabled={isSubmitting}>
            {buttonStrings.signup}
          </Button>
        </VStack>
      )}
    </Formik>
  );
}
