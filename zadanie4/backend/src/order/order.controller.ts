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
    Query,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequiredRole } from '../auth/required-role.decorator';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../user/role.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './order-status.enum';
import { OrderService } from './order.service';

@Controller('orders')
@ApiTags('Orders')
@UseGuards(JwtAuthGuard, RoleGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequiredRole(Role.USER)
    @ApiBearerAuth()
    async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.orderService.create(createOrderDto);
    }

    @ApiQuery({
        name: 'status',
        required: false,
        enum: OrderStatus
    })
    @Get()
    @RequiredRole(Role.ADMIN)
    @ApiBearerAuth()
    async findAll(@Query('status') status?: OrderStatus): Promise<Order[]> {
        return await this.orderService.findAll(status);
    }

    @Get('/status')
    @RequiredRole(Role.ADMIN)
    @ApiBearerAuth()
    findStatuses(): OrderStatus[] {
        return this.orderService.getAllPossibleStatuses();
    }

    @Get(':id')
    @RequiredRole(Role.ADMIN)
    @ApiBearerAuth()
    async findOne(@Param('id') id: string): Promise<Order> {
        return await this.orderService.findOne(+id);
    }

    @Patch(':id')
    @RequiredRole(Role.ADMIN)
    @ApiBearerAuth()
    async update(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto
    ): Promise<Order> {
        return await this.orderService.update(+id, updateOrderDto);
    }

    @Put(':id/approve')
    @RequiredRole(Role.ADMIN)
    @ApiBearerAuth()
    async approveOrder(@Param('id') id: string): Promise<Order> {
        return await this.orderService.changeOrderStatus(
            +id,
            OrderStatus.APPROVED
        );
    }

    @Put(':id/complete')
    @RequiredRole(Role.ADMIN)
    @ApiBearerAuth()
    async completeOrder(@Param('id') id: string): Promise<Order> {
        return await this.orderService.changeOrderStatus(
            +id,
            OrderStatus.COMPLETED
        );
    }

    @Put(':id/cancel')
    @RequiredRole(Role.ADMIN)
    @ApiBearerAuth()
    async cancelOrder(@Param('id') id: string): Promise<Order> {
        return await this.orderService.changeOrderStatus(
            +id,
            OrderStatus.CANCELLED
        );
    }
}
