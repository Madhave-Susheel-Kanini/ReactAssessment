using Microsoft.EntityFrameworkCore;
using TourPortal.Data;
using TourPortal.Interfaces;
using TourPortal.Models;

namespace TourPortal.Repositories
{
    public class UserRepository:IUser
    {
        private readonly UserContext _Context;
        public UserRepository(UserContext con)
        {
            _Context = con;
        }
        public IEnumerable<UserDetail> GetUser()
        {
            return _Context.UserDetails.Include(x => x.Bookings).Include(x => x.Feedbacks).ToList();
        }
        public UserDetail GetUserDetailsById(int id)
        {
            return _Context.UserDetails.FirstOrDefault(x => x.Id == id);
        }
        public UserDetail PostUserDetail(UserDetail UserDetail)
        {
            _Context.Add(UserDetail);
            _Context.SaveChanges();
            return UserDetail;
        }
        public UserDetail PutUserDetail(int id, UserDetail userDetail)
        {
            _Context.Entry(userDetail).State = EntityState.Modified;
            _Context.SaveChanges();
            return userDetail;
        }

        public UserDetail DeleteUserDetail(int id)
        {

            var user = _Context.UserDetails.Find(id);


            _Context.UserDetails.Remove(user);
            _Context.SaveChanges();

            return user;
        }
    }
}
