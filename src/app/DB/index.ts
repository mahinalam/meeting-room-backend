import config from '../config'
import { USER_ROLE } from '../modules/user/user.constant'
import { IUser } from '../modules/user/user.interface'
import { User } from '../modules/user/user.model'

const superUser: Partial<IUser> = {
  name: {
    firstName: 'Rifat',
    lastName: 'Islam',
  },
  email: config.admin_email,
  password: config.admin_pass,
  role: USER_ROLE.admin,
  isDeleted: false,
}

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isAdminExits = await User.findOne({ role: USER_ROLE.admin })
  if (!isAdminExits) {
    await User.create(superUser)
  }
}

export default seedSuperAdmin
