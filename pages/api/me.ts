import { NextApiRequest, NextApiResponse } from 'next'
import { validatesRoute } from '../../lib/auth'

export default validatesRoute(
  (req: NextApiRequest, res: NextApiResponse, user) => {
    res.json(user)
  }
)
