using BOL;
using BLL;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace _04_UIL.Controllers
{
    // EnableCors: Initializes a new instance of the System.Web.Http.Cors.EnableCorsAttribute class.
    //
    // Parameters:
    //   origins: Comma-separated list of origins that are allowed to access the resource. Use "*" to allow all.
    //   headers: Comma-separated list of headers that are supported by the resource. Use "*" to allow all. Use null or empty string to allow none.
    //   methods: Comma-separated list of methods that are supported by the resource. Use "*" to allow all. Use null or empty string to allow none.
    [EnableCors("*", "*", "*")]
    public class UserController : ApiController
    {

        // GET: api/Author
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<UserModel[]>(UserManager.SelectAllUsers(), new JsonMediaTypeFormatter())
            };
        }

        // GET: api/Author/5
        public HttpResponseMessage Get(string userName)
        {
            UserModel user = UserManager.SelectUserByName(userName);
            if (user != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<UserModel>(user, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }


        // POST: api/Author
        public HttpResponseMessage Post([FromBody]UserModel value)
        {
            bool insertResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                insertResult = UserManager.InsertUser(value);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/Author/5
        public HttpResponseMessage Put(string userName, [FromBody]UserModel value)
        {
            bool updateResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                updateResult = UserManager.UpdateUserByName(userName, value);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }

        // DELETE: api/Author/5
        public HttpResponseMessage Delete(string userName)
        {
            bool deleteResult = UserManager.DeleteUserByName(userName);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
