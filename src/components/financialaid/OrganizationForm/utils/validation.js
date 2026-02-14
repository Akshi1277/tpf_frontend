/**
 * Validation utilities for the organization registration form
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  // Indian phone number: 10 digits starting with 6-9
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validatePAN = (pan) => {
  // PAN format: 5 letters, 4 digits, 1 letter
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  return panRegex.test(pan.toUpperCase())
}

export const validateURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateRegistrationNumber = (regNumber) => {
  // Basic validation: should not be empty and should be alphanumeric
  return regNumber && /^[A-Z0-9\-\/]+$/i.test(regNumber)
}

export const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters and limit to 10 digits
  return phone.replace(/\D/g, '').slice(0, 10)
}

export const formatPAN = (pan) => {
  // Convert to uppercase and limit to 10 characters
  return pan.toUpperCase().slice(0, 10)
}

export const getValidationErrors = (formData, isNGO) => {
  const errors = {}

  // Step 1 validations
  if (!formData.isNGO) {
    errors.isNGO = "Please select organization type"
  }

  if (!formData.organizationName?.trim()) {
    errors.organizationName = "Organization name is required"
  }

  if (!formData.registrationNumber?.trim()) {
    errors.registrationNumber = "Registration number is required"
  } else if (!validateRegistrationNumber(formData.registrationNumber)) {
    errors.registrationNumber = "Invalid registration number format"
  }

  if (!formData.organizationEmail?.trim()) {
    errors.organizationEmail = "Organization email is required"
  } else if (!validateEmail(formData.organizationEmail)) {
    errors.organizationEmail = "Invalid email format"
  }

  if (!formData.state) {
    errors.state = "State is required"
  }

  if (!formData.city) {
    errors.city = "City is required"
  }

  if (isNGO) {
    if (!formData.founderName?.trim()) {
      errors.founderName = "Founder name is required"
    }

    if (!formData.founderEmail?.trim()) {
      errors.founderEmail = "Founder email is required"
    } else if (!validateEmail(formData.founderEmail)) {
      errors.founderEmail = "Invalid email format"
    }

    if (!formData.founderMobile?.trim()) {
      errors.founderMobile = "Founder mobile is required"
    } else if (!validatePhone(formData.founderMobile)) {
      errors.founderMobile = "Invalid mobile number"
    }

    if (!formData.causesSupported || formData.causesSupported.length === 0) {
      errors.causesSupported = "Please select at least one cause"
    }
  } else {
    if (!formData.businessDomain) {
      errors.businessDomain = "Business domain is required"
    }

    if (!formData.directorName?.trim()) {
      errors.directorName = "Director name is required"
    }

    if (!formData.directorEmail?.trim()) {
      errors.directorEmail = "Director email is required"
    } else if (!validateEmail(formData.directorEmail)) {
      errors.directorEmail = "Invalid email format"
    }

    if (!formData.directorMobile?.trim()) {
      errors.directorMobile = "Director mobile is required"
    } else if (!validatePhone(formData.directorMobile)) {
      errors.directorMobile = "Invalid mobile number"
    }
  }

  // Step 2 validations
  if (!formData.contactName?.trim()) {
    errors.contactName = "Contact name is required"
  }

  if (!formData.contactNumber?.trim()) {
    errors.contactNumber = "Contact number is required"
  } else if (!validatePhone(formData.contactNumber)) {
    errors.contactNumber = "Invalid mobile number"
  }

  if (!formData.contactEmail?.trim()) {
    errors.contactEmail = "Contact email is required"
  } else if (!validateEmail(formData.contactEmail)) {
    errors.contactEmail = "Invalid email format"
  }

  if (!formData.designation?.trim()) {
    errors.designation = "Designation is required"
  }

  // Step 3 validations
  if (isNGO) {
    if (!formData.has80G) {
      errors.has80G = "Please specify 80G certification status"
    }

    if (formData.has80G === "yes") {
      if (!formData.expiryDate) {
        errors.expiryDate = "Expiry date is required"
      }

      if (!formData.certification80G) {
        errors.certification80G = "80G certificate is required"
      }

      if (!formData.panCard?.trim()) {
        errors.panCard = "PAN card number is required"
      } else if (!validatePAN(formData.panCard)) {
        errors.panCard = "Invalid PAN format (e.g., ABCDE1234F)"
      }

      if (!formData.panCardImage) {
        errors.panCardImage = "PAN card document is required"
      }
    }

    if (!formData.hasFCRA) {
      errors.hasFCRA = "Please specify FCRA certification status"
    }
  } else {
    if (!formData.documentType) {
      errors.documentType = "Please select document type"
    }

    if (!formData.businessDocument) {
      errors.businessDocument = "Business registration document is required"
    }

    if (!formData.businessPanCard) {
      errors.businessPanCard = "PAN card document is required"
    }
  }

  return errors
}

export const validateFileSize = (file, maxSizeMB = 5) => {
  if (!file) return { valid: true }
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size must be less than ${maxSizeMB}MB`
    }
  }
  
  return { valid: true }
}

export const validateFileType = (file, allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png']) => {
  if (!file) return { valid: true }
  
  const fileName = file.name.toLowerCase()
  const isValidType = allowedTypes.some(type => fileName.endsWith(type))
  
  if (!isValidType) {
    return {
      valid: false,
      error: `File type must be one of: ${allowedTypes.join(', ')}`
    }
  }
  
  return { valid: true }
}