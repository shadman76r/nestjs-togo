import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SellPropertyService } from './sell-property.service';
import { SellProperty } from './sell-property.entity';

@Controller('sell-property')
export class SellPropertyController {
  constructor(private readonly sellPropertyService: SellPropertyService) {}

  // Public route to view properties
  @Get('public')
  async getPublicProperties() {
    return this.sellPropertyService.getApprovedProperties(); // Only approved and unsold properties
  }

  // Restricted route to create a property (sell part)
 
  @Post()
  async createProperty(@Body() propertyData: Partial<SellProperty>) {
    if (!propertyData.title || !propertyData.price || !propertyData.location) {
      throw new BadRequestException('Missing required fields: title, price, location');
    }
    return this.sellPropertyService.createProperty(propertyData);
  }

  // Upload property with file and details

  @Post('upload-with-details')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'public', 'uploads'),
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
          return callback(new BadRequestException('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadPropertyWithDetails(
    @Body() propertyData: Partial<SellProperty>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required for this request.');
    }

    if (!propertyData.title || !propertyData.price || !propertyData.location) {
      throw new BadRequestException('Missing required fields: title, price, location');
    }

    propertyData.filePath = `uploads/${file.filename}`; // Save relative file path
    return this.sellPropertyService.createProperty(propertyData);
  }

  // Restricted route to buy a property

  @Post('buy/:id')
  async buyProperty(@Param('id') id: number) {
    const property = await this.sellPropertyService.buyProperty(id);
    if (!property) {
      throw new BadRequestException('Property not found or already sold.');
    }
    return { message: 'Property purchased successfully', property };
  }

  // Restricted route to update property details
 
  @Patch(':id')
  async updateProperty(@Param('id') id: number, @Body() updateData: Partial<SellProperty>) {
    const updatedProperty = await this.sellPropertyService.updateProperty(id, updateData);
    if (!updatedProperty) {
      throw new BadRequestException('Property not found or update failed.');
    }
    return { message: 'Property updated successfully', updatedProperty };
  }

  // Restricted route to delete a property
 
  @Delete(':id')
  async deleteProperty(@Param('id') id: number) {
    const result = await this.sellPropertyService.deleteProperty(id);
    if (!result) {
      throw new BadRequestException('Property not found or delete failed.');
    }
    return { message: 'Property deleted successfully' };
  }
}
