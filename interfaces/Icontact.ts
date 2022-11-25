import Imessage from "./Imessage";

export interface Icontact{
    isGroup:boolean
    name?:string,
   picture?: string,
   groupMemberPicture?:string
    msgs?: Imessage[],
    id:string
    
}