import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AccessService } from 'src/access.service';

type Callback = {
  case_details: CaseDetails;
  case_details_before: CaseDetails;
};

type CaseDetails = {
  id: number;
  case_data: {
    name: string;
    claimants: [CollectionItem<Party>];
    defendants: [CollectionItem<Party>];
  };
};

type CollectionItem<T> = {
  id: string;
  value: T;
};

type Party = {
  name: string;
  representative: string;
};

type SubmittedCallbackResponse = {
  confirmation_header: string;
  confirmation_body: string;
};

@Controller()
export class AppController {
  constructor(private readonly accessService: AccessService) {}

  @Post('/manage-access')
  manageAccess(
    @Headers('Authorization') userAuthorisationToken: string,
    @Headers('ServiceAuthorization') serviceAuthorisationToken: string,
    @Body() callback: Callback,
  ): SubmittedCallbackResponse {
    callback.case_details.case_data.claimants.forEach((item) => {
      if (item.value.representative !== 'none') {
        this.accessService.updateCaseRole(
          item.value.representative,
          callback.case_details.id,
          ['[CSOLICITOR]'],
          userAuthorisationToken,
          serviceAuthorisationToken,
        );
      } else if (callback.case_details_before != null) {
        const previousItemState = callback.case_details_before.case_data.claimants.find(
          (previousItem) => previousItem.id === item.id,
        );
        if (
          previousItemState != null &&
          previousItemState.value.representative !== 'none'
        ) {
          this.accessService.updateCaseRole(
            previousItemState.value.representative,
            callback.case_details.id,
            [],
            userAuthorisationToken,
            serviceAuthorisationToken,
          );
        }
      }
    });
    callback.case_details.case_data.defendants.forEach((item) => {
      if (item.value.representative !== 'none') {
        this.accessService.updateCaseRole(
          item.value.representative,
          callback.case_details.id,
          ['[DSOLICITOR]'],
          userAuthorisationToken,
          serviceAuthorisationToken,
        );
      } else if (callback.case_details_before != null) {
        const previousItemState = callback.case_details_before.case_data.defendants.find(
          (previousItem) => previousItem.id === item.id,
        );
        if (
          previousItemState != null &&
          previousItemState.value.representative !== 'none'
        ) {
          this.accessService.updateCaseRole(
            previousItemState.value.representative,
            callback.case_details.id,
            [],
            userAuthorisationToken,
            serviceAuthorisationToken,
          );
        }
      }
    });
    return {
      confirmation_header: 'Access granted',
      confirmation_body: 'OK',
    };
  }
}
