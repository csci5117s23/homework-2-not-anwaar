
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, number, boolean} from 'yup';
import jwtDecode from 'jwt-decode'

const TodoYup = object({
  content: string().required(),
  done: boolean().required(),
  userId: string().required(),
  category: string().optional(),
  createdOn: date().required()
})

const CategoryYup = object({
  name: string().required()
})

const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)

app.use((req, res, next) => { //middleware to get around CORS
  res.set({"Access-Control-Allow-Origin": "*"})
  next()
})


app.use((req, res, next) => {
  if (req.method === "POST") {
      req.body.userId = req.user_token.sub
  } else if (req.method === "GET") {
      req.query.userId = req.user_token.sub
  }
  next();
})

app.use('/todo/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub
  const conn = await Datastore.open();
  try {
      console.log(id);
      const doc = await conn.getOne('todo', id)
      if (doc.userId != userId) {
          res.status(403).end();
          return
      }
  } catch (e) {
      console.log(e);
      res.status(404).end(e);
      return;
  }
  next();
})

app.use('/categories/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub
  const conn = await Datastore.open();
  try {
      console.log(id);
      const doc = await conn.getOne('categories', id)
      if (doc.userId != userId) {
          res.status(403).end();
          return
      }
  } catch (e) {
      console.log(e);
      res.status(404).end(e);
      return;
  }
  next();
})



// Use Crudlify to create a REST API for any collection
crudlify(app, {todo: TodoYup, categories: CategoryYup})

// bind to serverless runtime
export default app.init();
