import * as Yup from 'yup'

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
// const phoneRegExpr = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{7}$/
// const phoneRegExpr = /^(971[0-9]{9}|050[0-9]{7})$/
const phoneRegExpr = /^971\d{9}$|^0\d{9}$/;

export const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    first_name: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    billing: Yup.object({
        first_name: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        phone: Yup.string()
            .matches(
                phoneRegExpr,
                'Phone number must be 12 digits with country code or else 10 digits',
            )
            .required('Phone number is Required'),
    }),
});

export const loginValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });
  

// export const loginFormSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is Required'),
//   password: Yup.string().required('Password is Required'),
// })
// export const forgotFormSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is Required'),
//   password: Yup.string().required('Password is Required'),
//   rePassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Passwords must match')
//     .required('Re-Enter Password is Required'),
//   otp: Yup.string()
//     .required('OTP is Required')
//     .min(4, 'OTP must be exactly 4 characters')
//     .max(4, 'OTP must be exactly 4 characters'),
// })
// export const OTPFormSchema = Yup.object().shape({
//   otp: Yup.string()
//     .required('OTP is Required')
//     .min(4, 'OTP must be exactly 4 characters')
//     .max(4, 'OTP must be exactly 4 characters'),
// })
// export const couponFormSchema = Yup.object().shape({
//   couponCode: Yup.string().required('Coupon Code is Required'),
// })

// export const AddAddressFormSchema = Yup.object().shape({
//   fullName: Yup.string().required('Full Name is Required'),
//   // phone: Yup.string()
//   //   .required('Phone is Required')
//   //   .length(10)
//   //   .matches(phoneRegExp, {
//   //     message: 'Please enter a valid phone number',
//   //   }),
//   phone: Yup.string()
//     .matches(
//       phoneRegExpr,
//       'Phone number must be 12 digits with country code or else 10 digits',
//     )
//     .required('Phone number is Required'),
//   apartment: Yup.string().required('Address is Required'),
//   street: Yup.string().required('Street is Required'),
//   country: Yup.string().required('Country is Required'),
//   stateId: Yup.string().required('State is Required'),
//   state: Yup.string().required('State is Required'),
//   cityId: Yup.string().required('City is required'),
//   city: Yup.string().required('City is required'),
// })

// export const updateProfileFormSchema = Yup.object().shape({
//   name: Yup.string().required('Name is Required'),
//   email: Yup.string().email('Invalid email').required('Email is Required'),
//   phone: Yup.string()
//     .matches(phoneRegExp, 'Phone number is not valid')
//     .required('Phone number is Required'),
// })

// export const changePasswordFormSchema = Yup.object().shape({
//   oldPassword: Yup.string().required('Old Password is Required'),
//   newPassword: Yup.string().required('New Password is Required'),
//   confirmNewPassword: Yup.string()
//     .oneOf([Yup.ref('newPassword')], 'Passwords must match')
//     .required('Confirm New Password is Required'),
// })

// export const GuestRegisterFormSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is Required'),
//   // phoneNumber: Yup.string()
//   //   .matches(phoneRegExpr, 'Phone number is not valid')
//   //   .required('Phone number is Required'),

//   phoneNumber: Yup.string()
//     .matches(
//       phoneRegExpr,
//       'Phone number must be 12 digits with country code or else 10 digits',
//     )
//     .required('Phone number is Required'),
// })

// export const VerifyOtpFormSchema = Yup.object().shape({
//   code1: Yup.string().required('OTP is Required'),
//   code2: Yup.string().required('OTP is Required'),
//   code3: Yup.string().required('OTP is Required'),
//   code4: Yup.string().required('OTP is Required'),
// })
