import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminRoute } from '../auth/admin-route.decorator';
import { UserRoute } from '../auth/user-route.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './order-status.enum';
import { OrderService } from './order.service';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UserRoute()
    async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.orderService.create(createOrderDto);
    }

    @ApiQuery({
        name: 'status',
        required: false,
        enum: OrderStatus
    })
    @Get()
    @AdminRoute()
    async findAll(@Query('status') status?: OrderStatus): Promise<Order[]> {
        return await this.orderService.findAll(status);
    }

    @Get('/status')
    @AdminRoute()
    findStatuses(): OrderStatus[] {
        return this.orderService.getAllPossibleStatuses();
    }

    @Get(':id')
    @AdminRoute()
    async findOne(@Param('id') id: string): Promise<Order> {
        return await this.orderService.findOne(+id);
    }

    @Patch(':id')
    @AdminRoute()
    async update(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto
    ): Promise<Order> {
        return await this.orderService.update(+id, updateOrderDto);
    }

    @Put(':id/approve')
    @AdminRoute()
    async approveOrder(@Param('id') id: string): Promise<Order> {
        return await this.orderService.changeOrderStatus(
            +id,
            OrderStatus.APPROVED
        );
    }

    @Put(':id/complete')
    @AdminRoute()
    async completeOrder(@Param('id') id: string): Promise<Order> {
        return await this.orderService.changeOrderStatus(
            +id,
            OrderStatus.COMPLETED
        );
    }

    @Put(':id/cancel')
    @AdminRoute()
    async cancelOrder(@Param('id') id: string): Promise<Order> {
        return await this.orderService.changeOrderStatus(
            +id,
            OrderStatus.CANCELLED
        );
    }
}
