import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service'; // Asegúrate de importar SeedService desde su ubicación correcta.

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {} // Inyecta SeedService en el constructor.

  @Get()
  async execute() {
    return await this.seedService.execute();
  }
}
