import User from '../../../models/User'
import {USER_ADDED} from './channels'

export default {
  User: {
    fullName: (user) => `${user.firstName} ${user.lastName}`,
  },
  Query: {
    users: () => User.find(),
    user: (_, {id})=> User.findById(id),
  },
  Mutation: {
    createUser: (_, {data}, {pubsub}) => {
      const user = User.create(data)
      pubsub.publish(USER_ADDED, {
        userAdded: user,
      });
      return user;
    },
    updateUser: (_, {id, data}) => User.findByIdAndUpdate(id, data, {new: true}),
    deleteUser: async (_, {id}) => !!(await User.findByIdAndDelete(id)),
  },
  Subscription:{
    userAdded:{
      subscribe: (obj, agrs, {pubsub}) => pubsub.asyncIterator(USER_ADDED)
    }
  }
}