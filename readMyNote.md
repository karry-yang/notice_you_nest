# nest项目笔记

## nest项目的初始化

- 下载nset

## @nestjs/swagger

### 说明

- @nestjs/swagger 是 NestJS 官方提供的一个模块，用来集成 Swagger（一个用于自动生成 RESTful API 文档的工具）到 NestJS 项目中。它的主要作用是 根据你的代码自动生成 OpenAPI（Swagger）文档，方便前后端对接和接口调试

### 装饰器

- `@ApiTags--用于给 Controller 添加标签（用于文档分组显示）`

  ```ts
  @ApiTags('用户管理')
  @Controller('users')
  export class UserController {}
  ```

- `@ApiOperation---为某个接口（方法）添加操作说明。`

  ```ts
  @ApiOperation({ summary: '创建用户', description: '用于注册新用户' })
  @Post()
  createUser() {}
  <!--      summary: 简短的描述（必填）
            description: 更详细的描述（可选）
            operationId: 给这个操作起个唯一 ID（可选）
            deprecated: 是否标记为已废弃（可选 -->
  ```

- `@ApiResponse-- 描述接口可能的响应状态和结构，支持多个`。

  ```ts
  @ApiResponse({ status: 200, description: '返回用户信息', type: UserResponseDto })
  @ApiResponse({ status: 404, description: '用户不存在' })
  <!-- status: HTTP 状态码（必填）
  description: 描述信息（必填）
  type: 返回的数据结构 DTO（推荐填写）
  isArray: 如果返回的是数组，加上 isArray: true -->

  ```

- `@ApiProperty---用于定义 DTO 中字段的 Swagger 描述（必须字段）。`

  ```ts
  export class CreateUserDto {
    @ApiProperty({ description: '用户名', example: 'john_doe' })
    username: string;

    @ApiProperty({ description: '密码', example: '123456' })
    password: string;
    description: 字段说明（推荐）
  }
   <!-- example: 示例值
  required: 是否必填（默认为 true）
  enum: 枚举值（如传入 enum 类型）
  type: 手动指定字段类型（在泛型或嵌套对象中很有用）
  isArray: 如果是数组，加上 isArray: true  -->
  ```

- `@ApiPropertyOptional---用于定义非必填字段，与 @ApiProperty 类似，但会自动设置 required: false。`

  ```ts
  export class UpdateUserDto {
  @ApiPropertyOptional({ description: '新的用户名', example: 'new_name' })
  username?: string;
  <!-- 同 @ApiProperty，只是自动设置了 required: false，可覆盖。 -->
  }
  ```

- `@ApiBearerAuth()--- 作用： 声明接口需要 Bearer Token 认证（JWT）`

  ```ts
  @ApiBearerAuth()
  @ApiTags('用户管理')
  @Controller('users')
  export class UserController {}
   <!-- Swagger 中会自动出现 "Authorize" 按钮，可以填 token。 -->
  ```

- `@ApiQuery()---标记查询参数（Query 参数）`

```ts
@ApiQuery({ name: 'page', required: false, type: Number, description: '页码' })
@ApiQuery({ name: 'size', required: false, type: Number, description: '每页数量' })
@Get()
findAll(@Query('page') page?: number, @Query('size') size?: number) {}
```

- `@ApiParam()---标记路径参数（如 /users/:id 中的 id）`

  ```ts
  @ApiParam({ name: 'id', type: String, description: '用户ID' })
  @Get(':id')
  getUser(@Param('id') id: string) {}

  ```

- `@ApiBody()---显式指定请求体类型（尤其用于 POST/PUT）`

  ```ts
  @ApiBody({ type: CreateUserDto, description: '创建用户所需信息' })
  @Post()
  create(@Body() dto: CreateUserDto) {}
  ```

- `@ApiExtraModels() + @ApiResponse({ schema: {} })--- 在需要引用多个嵌套或泛型模型时，告诉 Swagger 要额外包含的 DTO（高级用法）`

  ```ts
  @ApiExtraModels(PaginatedResponseDto, UserDto)
  @ApiResponse({
  status: 200,
  schema: {
    allOf: [
      { $ref: getSchemaPath(PaginatedResponseDto) },
    ],
  },
  })
  ```

- `getSchemaPath()（辅助函数）---用于手动引用嵌套模型，搭配 schema 使用。`

  ```ts
  import { getSchemaPath } from '@nestjs/swagger';
  ```

- `@ApiConsumes() / @ApiProduces()---指定接口消费（请求）或生产（响应）哪些内容类型（MIME）`
  ```ts
  @ApiConsumes('multipart/form-data')
  @ApiProduces('application/json')
  ```
