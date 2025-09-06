import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

const getUserProfileContrller = expressAsyncHandler((req: Request, res: Response) => {
    res.status(200).json({
        success : true,
        user : req.user
    })
})

export default getUserProfileContrller;