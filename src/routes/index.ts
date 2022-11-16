import express, {Request, Response} from 'express';


const router = express.Router()

router.get('/', (req: Request, res:Response)=> {
    res.status(200).send(`Welcome to skipper store click here to view Documentation`)
})


export default router