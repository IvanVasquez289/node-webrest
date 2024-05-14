import express, { Router } from 'express'
import path from 'path'


interface Options {
    port: number;
    public_path?: string;
    routes: Router
}

export class Server{
    private app = express()

    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: Options){
        const {port,routes,public_path = 'public'} = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start(){

        //* Middlewares

        //* Public folder
        this.app.use(express.static(this.public_path))

        // * Routes
        this.app.use(this.routes)

        // * SPA
        this.app.get('*',(req,res)=>{
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`)
            res.sendFile(indexPath)
        })

        this.app.listen(this.port,()=>{
            console.log('Server is running on port', 3000)
        })
    }
}