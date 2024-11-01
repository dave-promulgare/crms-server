import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CredoService } from './credo.service';
import { ApiTags } from '@nestjs/swagger';
import { API_VERSION } from 'src/constants';
import { CreateAgentDto } from './dto/credo.dto';

@Controller(`${API_VERSION}/credo`)
@ApiTags('Credo')
export class CredoController {
  private readonly logger = new Logger(CredoController.name);
  constructor(private readonly credoService: CredoService) {}

  @Get('agent-alice')
  createAgentAlice(): string {
    this.credoService.createAgent("Alice", "http://192.168.2.192", 9000, 4000, 5000);
    return 'Started agent';
  }

  @Get('agent-faber')
  createAgentFaber(): string {
    this.credoService.createAgent("Faber", "http://192.168.2.192", 9001, 4001, 5001);
    return 'Started agent';
  }
  private agentId: string;

  @Post('start')
  async startAgent(@Body() createAgentDto: CreateAgentDto): Promise<string> {
    
    
    await this.credoService.createAgent(
      createAgentDto.name,
      createAgentDto.endpoint,
      createAgentDto.port,
      createAgentDto.oid4vcPort,
      2000
    )
    this.agentId = createAgentDto.name;
    return 'Agent started';
    // startAgent(createAgentDto);
  }

  @Get('invite')
  async createInvitation(): Promise<any> {
    return await this.credoService.createNewInvitation(this.agentId);
  }

  
}
