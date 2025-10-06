import { IdentityAddress, Prisma } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { AddressOwner, CreateAddressDto } from '../dto/create-address.dto';

@Injectable()
export class UserAddressesService {
  constructor(private readonly addressRepo: AddressRepository) {}

  async addAddress(
    userId: string,
    dto: CreateAddressDto,
  ): Promise<IdentityAddress> {
    if (dto.owner === AddressOwner.VENDOR && !dto.organizationId) {
      throw new BadRequestException(
        'organizationId is required when owner is VENDOR',
      );
    }

    if (dto.isDefault) {
      await this.addressRepo.clearDefault(
        userId,
        dto.owner === AddressOwner.VENDOR ? dto.organizationId! : null,
      );
    }

    const data: Prisma.IdentityAddressUncheckedCreateInput = {
      userId,
      organizationId:
        dto.owner === AddressOwner.VENDOR ? dto.organizationId! : null,
      type: dto.type,
      addressLine1: dto.addressLine1,
      addressLine2: dto.addressLine2 ?? null,
      city: dto.city,
      state: dto.state,
      country: dto.country,
      postalCode: dto.postalCode,
      latitude: dto.latitude ?? null,
      longitude: dto.longitude ?? null,
      isDefault: dto.isDefault ?? false,
    };

    return this.addressRepo.create(data);
  }

  async listForUser(userId: string): Promise<IdentityAddress[]> {
    return this.addressRepo.findByUserId(userId);
  }
}
