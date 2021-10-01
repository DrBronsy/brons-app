import UserModel from '../models/user.model';

export default (session?: any) => {
  return {
    Query: {
      async users() {
        const res: any = await UserModel.find({});
        return res.map((u: any) => ({
          id: u._id.toString(),
          displayName: u.displayName,
          steam: u.steam
        }));
      },
      session() {
        return session
      }
    },
  };
}