import { NextFunction , Response,Request} from "express"


const paginationProduct = (models: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const page = parseInt(req.query.page as string , 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 5;
        
        if (page <= 0 || limit <= 0) {
            res.status(400).json({ error: 'Page and limit must be positive integers.' });
        }
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const result: any = {};

        if(endIndex < models.length){
            result.next = {
                page: page + 1,
                limit: limit
            }
        }
        if(startIndex > 0){
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }
        result.result = models.slice(startIndex,endIndex)
        res.json(result);
        next();
    }
}
export default paginationProduct;