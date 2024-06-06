import express, { Router } from 'express'
import path from 'path'


interface Options {
    port: number;
    public_path?: string;
    routes: Router
}

export class Server{
    public readonly app = express()
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;
    private serverListener? : any;

    constructor(options: Options){
        const {port,routes,public_path = 'public'} = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }
    async start(){

        //* Middlewares
        this.app.use(express.json())  // rar
        this.app.use(express.urlencoded({extended:true}))  // x-www-form-enconded

        //* Public folder
        this.app.use(express.static(this.public_path))

        // * Routes
        this.app.use(this.routes)

        // * SPA
        this.app.get('*',(req,res)=>{
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`)
            res.sendFile(indexPath)
        })

        this.serverListener = this.app.listen(this.port,()=>{
            console.log('Server is running on port', this.port)
        })
    }

    public close() {
        this.serverListener?.close()
    }
}