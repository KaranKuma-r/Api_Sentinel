const User = require("../models/User")

const aiLimiter = async (req, res, next) => {

  try {

    const { userId } = req.agent 

    const user = await User.findById(userId)

    const now = Date.now()

    if (user.lastAIUsage) {

      const diff = now - new Date(user.lastAIUsage).getTime()

      const hours = diff / (1000 * 60 * 60)

      if (hours < 24) {

        const remaining = Math.ceil(24 - hours)

        return res.status(429).json({
          message: `AI already used. Try again after ${remaining} hours`
        })
      }

    }

    next()

  } catch (error) {

    res.status(500).json({
      message: "Limiter error"
    })

  }

}

module.exports = aiLimiter