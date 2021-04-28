type Validator = {
  errMsg: string
  check: (target: string) => boolean
}

export type Target = {
  value: string
  errMsg: string
}

const REQUIRED: Validator = {
  errMsg: 'This field cannot be empty.',
  check: (target: string): boolean => {
    return target.length !== 0
  },
}

const EMAIL: Validator = {
  errMsg: 'Please enter a valid email.',
  check: (target: string): boolean => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(String(target).toLowerCase())
  },
}

const NUM_AND_LETTER: Validator = {
  errMsg: 'Mixture of number and letter is required.',
  check: (target: string): boolean => {
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
    return regex.test(target)
  },
}

const SPECIAL_CHAR: Validator = {
  errMsg: 'Inclusion of special character, e.g. ! @ # ? ] is required.',
  check: (target: string): boolean => {
    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    return regex.test(target)
  },
}

const LENGTH_EIGHT: Validator = {
  errMsg: 'At least 8 characters required.',
  check: (target: string): boolean => {
    return target.length > 7
  },
}

const NUM_ONLY: Validator = {
  errMsg: 'Only number is allowed.',
  check: (target: string): boolean => {
    const regex = /^[0-9]*$/
    return regex.test(target)
  },
}

/**
 * check whether the target passes the integrity test
 * @param target target to be tested
 * @param validators validators of types of integrity test
 * @returns target with error message if fails testing, else original target
 */
export const checkIntegrity = (target: Target, validators: Array<Validator>): Target => {
  validators.some((validator) => {
    if (!validator.check(target.value)) return (target.errMsg = validator.errMsg)
  })
  return target
}

/**
 * check whether 2 targets have the same value
 *
 * @param target1
 * @param target2
 * @returns target array with error message if fails testing, else original targets
 */
export const checkSameValue = (target1: Target, target2: Target): Array<Target> => {
  if (target1.value != target2.value) {
    target1.errMsg = target2.errMsg = 'Please enter the same value'
  }
  return [target1, target2]
}

/**
 * check whether a form state has no error
 * @param formState
 * @returns true if no error, else false
 */
export const formNoErr = (formState: Record<string, Target>): boolean => {
  let flag = true
  for (const key of Object.keys(formState)) {
    if (formState[key].errMsg) {
      flag = false
      break
    }
  }
  return flag
}

/**
 * convert form state to data to be passed through API
 * @param formState
 * @returns object of data
 */
export const toData = (formState: Record<string, Target>): Record<string, string | number> => {
  const data: Record<string, string | number> = {}
  for (const key of Object.keys(formState)) {
    data[key] = formState[key].value
  }
  return data
}

export const VALIDATORS = {
  REQUIRED,
  EMAIL,
  NUM_AND_LETTER,
  SPECIAL_CHAR,
  LENGTH_EIGHT,
  NUM_ONLY,
}

/**
 * Usage:
 * const email = checkIntegrity(input.email, [VALIDATORS.REQUIRED, VALIDATORS.EMAIL])
 */
