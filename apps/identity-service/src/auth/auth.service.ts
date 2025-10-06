import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtTokenService } from './common/jwt.service';
import { UserRepository, UserWithRelations } from './users/user.repository';
import { UserBO } from './users/user.bo';
import { RedisService } from './common/redis.service';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import {
  AddressSummary,
  MembershipSummary,
  OrganizationSummary,
  RoleSummary,
  UserProfileDto,
} from './dto/user-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly userRepo: UserRepository,
    private readonly redisService: RedisService,
  ) {}

  async sendOtp(dto: { phone: string }): Promise<{ message: string }> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    await this.redisService.set(`otp:${dto.phone}`, otp, 300);
    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(dto: {
    phone: string;
    otp: string;
    role: string;
  }): Promise<any> {
    const cacheKey = `otp:${dto.phone}`;
    const cachedOtp = await this.redisService.get(cacheKey);
    if (cachedOtp !== dto.otp) throw new UnauthorizedException('Invalid OTP');
    console.log(cachedOtp);
    await this.redisService.del(cacheKey);
    const user = await this.userRepo.upsertByPhone(
      dto.phone,
      dto.role,
      'default-tenant',
    );
    const userBO = new UserBO(user);

    const payload = {
      sub: userBO.id,
      tenantId: userBO.tenantId,
      orgId: userBO.orgId,
      roles: [],
    };
    const accessToken = await this.jwtTokenService.signAccess(payload);
    const refreshToken = await this.jwtTokenService.signRefresh(payload);

    return { user: userBO, accessToken, refreshToken };
  }

  async refreshToken(token: string): Promise<any> {
    try {
      const payload = (await this.jwtTokenService.verifyRefresh(token)) as {
        sub: string;
        tenantId?: string;
        orgId?: string;
        roles?: string[];
      };
      const user = await this.userRepo.findById(payload.sub);
      if (!user) throw new UnauthorizedException('User not found');
      const userBO = new UserBO(user);
      const newPayload = {
        sub: userBO.id,
        tenantId: userBO.tenantId,
        orgId: userBO.orgId,
        roles: [],
      };

      return {
        accessToken: await this.jwtTokenService.signAccess(newPayload),
        refreshToken: await this.jwtTokenService.signRefresh(newPayload),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async completeProfile(
    userId: string,
    dto: CompleteProfileDto,
  ): Promise<UserBO> {
    const user = await this.userRepo.updateProfile(userId, dto);
    return new UserBO(user);
  }

  async getUserProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.userRepo.findDetailedById(userId);
    if (!user) throw new NotFoundException('User not found');

    return this.mapUserToProfile(user);
  }

  private mapUserToProfile(user: UserWithRelations): UserProfileDto {
    const organization = user.organization
      ? this.mapOrganization(user.organization)
      : null;

    const roles: RoleSummary[] = user.roles
      .map((userRole) => userRole.role)
      .filter((role): role is NonNullable<typeof role> => Boolean(role))
      .map((role) => ({
        id: role.id,
        name: role.name,
        description: role.description,
      }));

    const addresses: AddressSummary[] = user.identityAddresses.map(
      (address) => ({
        id: address.id,
        type: address.type,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
        latitude: address.latitude,
        longitude: address.longitude,
        isDefault: address.isDefault,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
        organization: address.organization
          ? this.mapOrganization(address.organization)
          : null,
      }),
    );

    const memberships: MembershipSummary[] = user.identityMemberships.map(
      (membership) => ({
        id: membership.id,
        organization: this.mapOrganization(membership.organization),
        role: membership.role
          ? {
              id: membership.role.id,
              name: membership.role.name,
              description: membership.role.description,
            }
          : null,
        createdAt: membership.createdAt,
        updatedAt: membership.updatedAt,
      }),
    );

    return {
      id: user.id,
      phone: user.phone,
      email: user.email,
      name: user.name,
      tenantId: user.tenantId,
      organizationId: user.organizationId,
      userType: user.userType,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      organization,
      addresses,
      memberships,
      roles,
    };
  }

  private mapOrganization(
    org: NonNullable<UserWithRelations['organization']>,
  ): OrganizationSummary {
    return {
      id: org.id,
      name: org.name,
      type: org.type,
      status: org.status,
    };
  }
}
