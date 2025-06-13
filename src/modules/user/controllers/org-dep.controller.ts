import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Org-dep')
@Controller('org-dep')
export class OrgDepController{
  constructor(){}
}