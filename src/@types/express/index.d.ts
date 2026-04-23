declare namespace Express {
    export interface Request {
        file?: Express.Multer.File;
        files?: Express.Multer.File[];
        user_id?: string; // Optional userId property for authenticated requests
    }

}