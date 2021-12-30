import React from 'react';
import {VStack, FormControl, Input, Link, Button, Text} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';

import AuthService from 'services/auth.service';

import {LoginApiProps} from 'types/apis';

const loginInitValue: LoginApiProps & {
  submit: string | null;
} = {
  email: '',
  password: '',
  submit: null,
};

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .min(8)
    .max(255)
    .required('Email is required'),
  password: Yup.string().min(8).max(255).required('Password is required'),
});

export default function AuthLogin(): JSX.Element {
  return (
    <Formik
      initialValues={loginInitValue}
      validationSchema={loginValidationSchema}
      onSubmit={async (
        values,
        {resetForm, setErrors, setStatus, setSubmitting},
      ) => {
        try {
          const {email, password} = values;
          await AuthService.login({email, password});
          setStatus({success: true});
          setSubmitting(false);
          resetForm();
        } catch (err) {
          setStatus({success: false});
          if ((err as Error).message) {
            console.log((err as Error).message);
            setErrors({submit: (err as Error).message});
          }
          setSubmitting(false);
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
            <FormControl.Label>Email</FormControl.Label>
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
            <FormControl.Label>Password</FormControl.Label>
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
          {errors.submit && (
            <Text color="error.500" textAlign="center">
              {errors.submit}
            </Text>
          )}
          <FormControl>
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'primary.500',
              }}
              alignSelf="flex-end"
              mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button
            mt="2"
            colorScheme="primary"
            onPress={() => handleSubmit()}
            bg={isSubmitting ? 'gray.200' : undefined}
            disabled={isSubmitting}>
            Sign in
          </Button>
        </VStack>
      )}
    </Formik>
  );
}
