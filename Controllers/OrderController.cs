﻿using BOL;
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
    public class OrderController : ApiController
    {

        // GET: api/Book
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<OrderModel[]>(OrderManager.SelectAllOrders(), new JsonMediaTypeFormatter())
            };
        }

        // GET: api/Book/5
        public HttpResponseMessage Get(string carNumber)
        {
            OrderModel order = OrderManager.SelectOrderByCarNumber(carNumber);
            if (order != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<OrderModel>(order, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }


        // POST: api/Book
        public HttpResponseMessage Post([FromBody]OrderModel value)
        {
            bool insertResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                insertResult = OrderManager.InsertOrder(value);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/Book/5
        public HttpResponseMessage Put(string carNumber, [FromBody]OrderModel value)
        {
            bool updateResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                updateResult = OrderManager.UpdateOrderByCarNumber(carNumber, value);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }

        // DELETE: api/Book/5
        public HttpResponseMessage Delete(string carNumber)
        {
            bool deleteResult = OrderManager.DeleteOrderByCarNumber(carNumber);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
