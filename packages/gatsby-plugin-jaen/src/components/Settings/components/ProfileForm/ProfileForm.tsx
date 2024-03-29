import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack
} from '@chakra-ui/react'
import React from 'react'
import {Controller, DeepPartial, useForm} from 'react-hook-form'

import {FieldGroup} from '../../../shared/FieldGroup'
import {FormImageChooser} from '../../../shared/FormImageChooser'

export interface ProfileFormData {
  firstName: string
  lastName: string
  displayName: string
  preferredLanguage: string
  gender: string
  avatarUrl: string
}

export interface ProfileFormDataUpdate {
  firstName: string
  lastName: string
  avatarURL?: string
  displayName: string
  preferredLanguage?: string
  gender?: string
  avatarUrl?: string
}

export interface ProfileFormProps {
  onSubmit: (data: ProfileFormDataUpdate) => Promise<void>
  defaultValues?: DeepPartial<ProfileFormData>
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  defaultValues
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: {errors, isSubmitting},
    setValue,
    reset
  } = useForm<ProfileFormData>({
    defaultValues
  })

  const [avatarFile, setAvatarFile] = React.useState<File | null>(null)

  const onFormSubmit = handleSubmit(async data => {
    // promise to wait for image upload

    await onSubmit({
      ...data
    })

    reset(data)
  })

  return (
    <form onSubmit={onFormSubmit}>
      <FieldGroup title="Account">
        <Stack width="full" spacing="8" maxW="2xl">
          <Stack>
            <FormControl id="firstName" isInvalid={!!errors.details?.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="" {...register('details.firstName', {})} />
              <FormErrorMessage>
                {errors.details?.firstName && errors.details.firstName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="lastName" isInvalid={!!errors?.details?.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="" {...register('details.lastName', {})} />
              <FormErrorMessage>
                {errors.details?.lastName && errors.details.lastName.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <FormControl id="username" isInvalid={!!errors.username} isDisabled>
            <FormLabel>Username</FormLabel>
            <Input
              isDisabled
              maxW="xs"
              {...register('username', {
                required: 'This field is required'
              })}
              autoComplete="false"
              color="fg.muted"
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="image">
            <FormLabel>Image</FormLabel>

            <Controller
              control={control}
              name="details.avatarURL"
              render={({field: {value}}) => {
                return (
                  <FormImageChooser
                    value={value}
                    onChoose={file => {
                      setAvatarFile(file)
                      setValue('details.avatarURL', URL.createObjectURL(file), {
                        shouldDirty: true
                      })
                    }}
                    onRemove={() => {
                      setAvatarFile(null)
                      setValue(
                        'details.avatarURL',
                        defaultValues?.details?.avatarURL || ''
                      )
                    }}
                    description="Upload a profile picture to make your account easier to recognize."
                  />
                )
              }}
            />
          </FormControl>

          <ButtonGroup>
            <Button isLoading={isSubmitting} type="submit" variant="outline">
              Update account
            </Button>
          </ButtonGroup>
        </Stack>
      </FieldGroup>
    </form>
  )
}

export default ProfileForm
