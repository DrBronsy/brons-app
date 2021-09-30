import {UserSteam} from 'models/user';

import {createOrUpdateUserForSteam} from 'services/user.service';

export async function registerUserForSteam(profile: UserSteam) {
    const user = await createOrUpdateUserForSteam(profile);
    return user;
}