import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index(@Res() res) {
    res.status(200).redirect('/cats');
  }
}
