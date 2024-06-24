/* eslint-disable prettier/prettier */
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/CreatePayments.dto';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsMicroserviceController {

    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy, private paymentService: PaymentsService) {}

    @EventPattern('createPayment')
    async createPayment(@Payload() data: CreatePaymentDto){
        console.log(data)
        const newPayment = await this.paymentService.createPayment(data);
        console.log(newPayment)
        if(newPayment) this.natsClient.emit('paymentCreated', newPayment)
    }
}
