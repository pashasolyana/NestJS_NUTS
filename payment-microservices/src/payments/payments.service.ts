/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/typeorm/entities/Payment';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dtos/CreatePayments.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  async createPayment({userId, ...createPaymentDto}: CreatePaymentDto){
    const user = await lastValueFrom<User>(this.natsClient.send({cmd: 'getUserById'}, {userId}),)
    console.log(user, 'user');
    if(!user){
        return null
    }
    const newPayment = this.paymentsRepository.create({...createPaymentDto, user});
    console.log(newPayment)
    return this.paymentsRepository.save(newPayment)
  }
}
