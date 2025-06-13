export class VerificationRedisDto {
 key!:string
 code!:string
 count!:number
 exporeAt?:string
 ttl:number=60
}
