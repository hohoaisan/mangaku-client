import {
  Button,
  Box,
  Modal,
  useDisclose,
  VStack,
  FormControl,
  Input,
  Text,
  Spinner,
} from 'native-base';
import React, {useEffect} from 'react';

import {useFormik} from 'formik';
import * as Yup from 'yup';

import {useQuery} from 'react-query';
import {PROFILE} from 'query/queryKeys';
import {getProfile, updateProfile} from 'apis/profile';

import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import strings from 'configs/strings';
import pick from 'utils/pick';
import ToastService from 'services/toast.service';

const {
  buttons,
  forms: {labels, validations: validateStrings},
  pages: {profile: profilePageStrings},
} = strings;

const profileEditInitValue = {
  name: '',
  email: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const editProfileValidationSchema = Yup.object().shape(
  {
    name: Yup.string()
      .min(3, validateStrings.nameValid.replace('$number', '3'))
      .max(255),
    email: Yup.string().email(validateStrings.emailValid).max(255),
    oldPassword: Yup.string()
      .min(8)
      .max(255)
      .when(['newPassword', 'confirmPassword'], {
        is: (newPassword: string, confirmPassword: string) =>
          newPassword && confirmPassword,
        then: Yup.string().min(8).max(255).required(),
      }),
    newPassword: Yup.string()
      .min(8)
      .max(255)
      .when(['oldPassword', 'confirmPassword'], {
        is: (oldPassword: string, confirmPassword: string) =>
          oldPassword && confirmPassword,
        then: Yup.string().min(8).max(255).required(),
      }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], validateStrings.passwordMustMatch)
      .min(8)
      .max(255)
      .when(['oldPassword', 'newPassword'], {
        is: (oldPassword: string, newPassword: string) =>
          oldPassword && newPassword,
        then: Yup.string().min(8).max(255).required(),
      }),
  },
  [
    ['newPassword', 'confirmPassword'],
    ['oldPassword', 'confirmPassword'],
    ['oldPassword', 'newPassword'],
  ],
);

const EditProfile: React.FC = () => {
  const {onOpen, isOpen, onClose} = useDisclose(false);
  const {isError, isLoading, error, data} = useQuery(PROFILE, getProfile, {
    enabled: false,
  });

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
    values,
    setValues,
  } = useFormik({
    initialValues: profileEditInitValue,
    validationSchema: editProfileValidationSchema,
    onSubmit: async (
      submitValues,
      {resetForm, setErrors, setStatus, setSubmitting},
    ) => {
      const {newPassword, oldPassword, confirmPassword} = submitValues;
      if (newPassword && oldPassword && confirmPassword) {
        submitValues = pick(
          values,
          ['name', 'email', 'newPassword', 'oldPassword', 'confirmPassword'],
          {
            allowNull: false,
            allowEmptyString: false,
          },
        );
      } else {
        submitValues = {
          ...profileEditInitValue,
          ...pick(submitValues, ['name', 'email']),
        };
      }
      try {
        await updateProfile(values);
        ToastService.success(profilePageStrings.mutations.updated);
      } catch (err) {
        const message = getAPIErrorMessage(err);
        ToastService.error(message);
      }
    },
  });

  useEffect(() => {
    if (data) {
      const formValues = {
        ...values,
        ...pick(data, ['email', 'name']),
      };
      setValues(formValues);
    }
  }, [data]);

  return (
    <Box>
      <Button onPress={onOpen}>{buttons.editProfile}</Button>
      <Modal isOpen={isOpen}>
        <Modal.Content>
          <Modal.Header>{buttons.editProfile}</Modal.Header>
          {(() => {
            if (isError) {
              const errorMessage = getAPIErrorMessage(error);
              return (
                <Modal.Body>
                  <Box
                    w="100%"
                    mt={5}
                    mb={5}
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <Text>{errorMessage}</Text>
                  </Box>
                </Modal.Body>
              );
            }

            if (isLoading || !data) {
              return (
                <Modal.Body>
                  <Box
                    w="100%"
                    mt={5}
                    mb={5}
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <Spinner color="cyan.500" />
                  </Box>
                </Modal.Body>
              );
            }
            return (
              <>
                <Modal.Body>
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
                      <FormControl.Label>
                        {labels.oldPassword}
                      </FormControl.Label>
                      <Input
                        type="password"
                        value={values.oldPassword}
                        onChangeText={handleChange('oldPassword')}
                        onBlur={handleBlur('oldPassword')}
                      />
                      {touched.oldPassword && errors.oldPassword && (
                        <FormControl.HelperText>
                          <Text color="error.500" fontSize="xs">
                            {errors.oldPassword}
                          </Text>
                        </FormControl.HelperText>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormControl.Label>
                        {labels.newPassword}
                      </FormControl.Label>
                      <Input
                        type="password"
                        value={values.newPassword}
                        onChangeText={handleChange('newPassword')}
                        onBlur={handleBlur('newPassword')}
                      />
                      {touched.newPassword && errors.newPassword && (
                        <FormControl.HelperText>
                          <Text color="error.500" fontSize="xs">
                            {errors.newPassword}
                          </Text>
                        </FormControl.HelperText>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormControl.Label>
                        {labels.confirmPassword}
                      </FormControl.Label>
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
                  </VStack>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      onPress={onClose}
                      bg={isSubmitting ? 'gray.200' : undefined}
                      disabled={isSubmitting}>
                      {buttons.close}
                    </Button>
                    <Button
                      onPress={() => handleSubmit()}
                      bg={isSubmitting ? 'gray.200' : undefined}
                      disabled={isSubmitting}>
                      {buttons.update}
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </>
            );
          })()}
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default EditProfile;
