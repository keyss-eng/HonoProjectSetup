import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'
import { joinWaitlistSchema } from '../../../packages/shared/src/schemas'
import type { D1Database } from '@cloudflare/workers-types'

// Cloudflare Environment Bindings
type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/*', cors())

app.get('/', (c) => {
  return c.text('Waitlist API is running perfectly!')
})

const generateReferralCode = () => Math.random().toString(36).substring(2, 8).toUpperCase()

// JOIN WAITLIST 
const joinRoute = app.post(
  '/api/join',
  zValidator('json', joinWaitlistSchema),
  async (c) => {
    const { email, referred_by } = c.req.valid('json')
    const db = c.env.DB
    const newRefCode = generateReferralCode()
    const id = crypto.randomUUID()

    try {
      // Check if user already exists
      const existingUser = await db.prepare('SELECT referral_code FROM waitlist_users WHERE email = ?').bind(email).first()
      if (existingUser) {
        return c.json({ success: true, message: "Already joined", referral_code: existingUser.referral_code })
      }

      // Insert new user
      await db.prepare(
        'INSERT INTO waitlist_users (id, email, referral_code, referred_by) VALUES (?, ?, ?, ?)'
      ).bind(id, email, newRefCode, referred_by || null).run()


      if (referred_by) {
        await db.prepare('UPDATE waitlist_users SET points = points + 10 WHERE referral_code = ?').bind(referred_by).run()
      }

      return c.json({ success: true, message: "Welcome to the waitlist!", referral_code: newRefCode })
    } catch (error) {
      return c.json({ success: false, message: "Something went wrong" }, 500)
    }
  }
)

// --- ROUTE 2: GET STATUS & RANK ---
const statusRoute = app.get('/api/status/:code', async (c) => {
  const code = c.req.param('code')
  const db = c.env.DB

  // SQL Query: Calculate Rank based on points and who joined first
  const query = `
    SELECT 
      (SELECT COUNT(*) + 1 FROM waitlist_users 
       WHERE points > w.points OR (points = w.points AND created_at < w.created_at)
      ) as rank,
      w.points,
      (SELECT COUNT(*) FROM waitlist_users WHERE referred_by = w.referral_code) as total_referrals
    FROM waitlist_users w
    WHERE w.referral_code = ?
  `
  
  const result = await db.prepare(query).bind(code).first()

  if (!result) {
    return c.json({ success: false, message: "User not found" }, 404)
  }

  return c.json({ success: true, data: result })
})

// --- EXPORT TYPES FOR FRONTEND ---
const routes = app.route('/', joinRoute).route('/', statusRoute)
export type AppType = typeof routes

export default app