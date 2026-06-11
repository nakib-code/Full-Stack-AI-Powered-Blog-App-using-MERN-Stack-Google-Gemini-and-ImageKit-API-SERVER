import express from 'express'
import { userRoute } from './modules/auth/auth.route'
import { BlogRoutes } from './modules/blog/blog.route'
import { adminRoutes } from './modules/admin/  admin.route'
import { commentRoutes } from './modules/comment/comment.route'


const app = express()
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', userRoute)
app.use('/api/blog', BlogRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/comment', commentRoutes)

export default app;