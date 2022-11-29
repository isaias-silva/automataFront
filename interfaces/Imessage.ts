export default interface Imessage{
    text:string,
    type: string
    name:string
    number?:string
    media?:{type:string, data?:string}
    picture?:string| null
}