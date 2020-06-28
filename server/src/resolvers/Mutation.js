const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')

async function signup(parent, args, context, info) {
  const hashedPassword = await bcrypt.hash(args.password, 10)
  try {
    const {password, ...user} = await context.prisma.createUser({ ...args, password: hashedPassword })

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
      token,
      user,
    }
  } catch (err) {
    if (err.result.errors[0].code === 3010) {
      console.log(`User with email ${args.email} already exists`)
      return {
        token: '',
        user: '',
      }
    }
  }
}

async function login(parent, args, context, info) {
  const result = await context.prisma.user({ email: args.email })
  if (result === null) {
    console.log('No such user found')
    return {
      token: '',
      user: ''
    }
  }

  if (result.user === null) {
    console.log('No such user found')
    return {
      token: '',
      user: ''
    }
  }

  const {password, ...user} = result

  const valid = await bcrypt.compare(args.password, password)
  if (!valid) {
    console.log('Invalid password')
    return {
      token: '',
      user: ''
    }
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

module.exports = {
  signup,
  login,
}
