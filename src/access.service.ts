import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AccessService {
  constructor(private readonly httpService: HttpService) {}

  updateCaseRole(
    userId: string,
    caseId: number,
    caseRoles: string[],
    userAuthorisationToken: string,
    serviceAuthorisationToken: string,
  ): void {
    this.httpService
      .put(
        `http://localhost:4452/cases/${caseId}/users/${userId}`,
        {
          user_id: userId,
          case_roles: caseRoles,
        },
        {
          headers: {
            Authorization: userAuthorisationToken,
            ServiceAuthorization: serviceAuthorisationToken,
          },
        },
      )
      .subscribe({
        error: (error) => {
          console.log('Error occurred', error);
        },
      });
  }
}
