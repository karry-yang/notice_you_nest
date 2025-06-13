import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export  class SimpleTagDto{
    @ApiProperty({description:'标签id'})
    @Expose({name:'tag_id'})
    tagId!:string

    @ApiProperty({description:'标签title'})
    @Expose({name:'tag_title'})
    tagTitle!:string

    @ApiProperty({description:'标签颜色'})
    @Expose({name:'tag_color'})
    tagColor!:string

     @ApiProperty({description:'父级标签',nullable: true })
     
    @Expose({name:'parent_id'})
    parentId !:string | null
}