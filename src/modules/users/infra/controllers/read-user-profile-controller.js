import StatusCode from '../../../../shared/utils/status-code.js';
import ReadUserProfileService from '../../services/read-user-profile-service.js';

async function ReadUserProfileController(request, response) {
  const { user } = request;

  const input = { user };
  const output = await ReadUserProfileService(input);

  return response
    .status(StatusCode.OK)
    .json(output);
}

export default ReadUserProfileController;
