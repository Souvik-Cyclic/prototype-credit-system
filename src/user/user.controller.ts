import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Delete,
  Patch,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
import { errorHandler, OK } from 'src/response/response.util';
import { UpdateUserDto } from './dto/user.dto';
import { AdminAuthGuard } from 'src/admin/admin-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all users', description: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async getAllUsers(@Res() res: Response) {
    try {
      const data = await this.userService.getAllUsers();
      return OK(res, 'Success', data, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get user', description: 'Get user' })
  @ApiResponse({ status: 200, description: 'Return user' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUser(@Res() res: Response, @Req() req) {
    try {
      const id = req.user;
      const data = await this.userService.getUserById(id);
      return OK(res, 'Success', data, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Delete('')
  @ApiOperation({ summary: 'Delete user', description: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User Deleted' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteUser(@Res() res: Response, @Req() req) {
    try {
      const id = req.user;
      const data = await this.userService.deleteUser(id);
      return OK(res, 'User Deleted', data, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Patch('')
  @ApiOperation({ summary: 'Update user', description: 'Update user' })
  @ApiResponse({ status: 200, description: 'User Updated' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(@Res() res: Response, @Req() req, @Body() body: UpdateUserDto) {
    try {
      const id = req.user;
      const data = await this.userService.updateUser(id, body);
      return OK(res, 'User Updated', data, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}
