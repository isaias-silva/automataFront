export default interface Imessage {
    text: string,
    type: string
    name: string
    number?: string
    read?: boolean
    media?: { type: string, data?: string, mimetype: string }
    picture?: string | null
    isMe: boolean
    quoted?: boolean
    msgQuoted?: Imessage | null
    msgObject?: any,
    date?:string
}