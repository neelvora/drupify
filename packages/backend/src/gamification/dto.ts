export class CreateStreakDto {
  readonly userId: string;
  readonly streakCount: number;
}

export class CreateBadgeDto {
  readonly userId: string;
  readonly badgeName: string;
}

export class CreateUserProgressDto {
  readonly userId: string;
  readonly progress: number;
}
