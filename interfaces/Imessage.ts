export default interface Imessage{
    text:string,
    type: string
    name:string
    number?:string
    media?:{mimetype?:string,filename?:string,filesize?:number, data?:string}
    picture?:string| null
}