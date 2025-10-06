export interface UserProfileDto {
  id: string;
  phone: string | null;
  email: string | null;
  name: string | null;
  tenantId: string;
  organizationId: string | null;
  userType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  organization: OrganizationSummary | null;
  addresses: AddressSummary[];
  memberships: MembershipSummary[];
  roles: RoleSummary[];
}

export interface OrganizationSummary {
  id: string;
  name: string;
  type: string;
  status: string;
}

export interface AddressSummary {
  id: string;
  type: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number | null;
  longitude: number | null;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  organization: OrganizationSummary | null;
}

export interface MembershipSummary {
  id: string;
  organization: OrganizationSummary;
  role: RoleSummary | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleSummary {
  id: string;
  name: string;
  description: string | null;
}
