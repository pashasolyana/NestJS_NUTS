/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post, Param, Get, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send({ cmd: "createUser"}, createUserDto)
  }

  @Get(':id')
  async getUserById(@Param('id') id: string){
    const user = await lastValueFrom(this.natsClient.send({cmd: "getUserById"}, {userId: id}))
    if(!user){
      throw new NotFoundException()
    }
    return user;

  }
}
