using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRUD_Angular.Models;
using System.Web.Script.Serialization;
using System.IO;
using Newtonsoft.Json;
using System.Net.Mail;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;
using System.Configuration;

namespace CRUD_Angular.Controllers.Home
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CRUD()
        {
            return View();
        }

        public ActionResult logout()
        {
            return PartialView();
        }

        public ActionResult Singup()
        {
            return PartialView();
        }

        public ActionResult Active(int id)
        {
            string StrResult = Update(id);
            TempData["Msg"] = StrResult;
            return RedirectToAction("Index");
        }


        public ActionResult dashboard()
        {
            return View();
        }


        public ActionResult Login()
        {
            return PartialView();
        }

        public JsonResult ValidateUser(Login user)
        {

            string path = Server.MapPath("/Scripts/DataSource.json");


            using (StreamReader r = new StreamReader(path))
            {
                string json = r.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Login[] dataObject = serializer.Deserialize<Login[]>(json);

                foreach (Login login in dataObject)
                {

                    if ((user.UserName == login.UserName && user.Password == login.Password))
                    {
                        Session["Username"] = user.UserName; 
                        Session["password"] = user.Password;
                        return Json("Success", JsonRequestBehavior.AllowGet);
                    }
                }
            }

            return Json("Fail", JsonRequestBehavior.AllowGet);
        }

        public string save(Login data)
        {
            try
            {

                if (!string.IsNullOrEmpty(data.UserName) && !string.IsNullOrEmpty(data.Password) && !string.IsNullOrEmpty(data.Email))
                {
                    string path = Server.MapPath("/Scripts/DataSource.json");
                    // Read existing json data
                    var jsonData = System.IO.File.ReadAllText(path);
                    // De-serialize to object or create new list
                    var employeeList = JsonConvert.DeserializeObject<List<Login>>(jsonData)
                                          ?? new List<Login>();
                    foreach (Login login in employeeList)
                    {
                        if ((data.UserName == login.UserName || data.Email == login.Email))
                        {
                            return "EXIST";
                        }
                    }

                    // Add any new employees
                    employeeList.Add(new Login()
                    {
                        Email = data.Email,
                        UserName = data.UserName,
                        Userid = employeeList.Count + 1,
                        Isactive = false,
                        Password = data.Password
                    });
                    // Update json data string
                    jsonData = JsonConvert.SerializeObject(employeeList);
                    System.IO.File.WriteAllText(path, jsonData);

                    try
                    {
                        string Applicationpath = Request.Url.Host;
                        string senderemail = ConfigurationManager.AppSettings["FromEmail"].ToString();
                        string SenderPassword = ConfigurationManager.AppSettings["FromEmailpassword"].ToString();
                        string toAddress = data.Email;
                        string subject = "Account activation";
                        string body = @" Hi " + data.UserName + ", </ br> Thanks for registering at Your Site.  To activate your email address click the link below! <br><br>"
                        + "Activation Link: <a href='" + Applicationpath + "'>Active</a>";

                        SmtpClient smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com", // smtp server address here…
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new System.Net.NetworkCredential(senderemail, SenderPassword),
                    Timeout = 30000,
                };
                        MailMessage message = new MailMessage(senderemail, toAddress, subject, body);
                        ServicePointManager.ServerCertificateValidationCallback =
            delegate(object s, X509Certificate certificate,
                     X509Chain chain, SslPolicyErrors sslPolicyErrors)
            { return true; };
                        smtp.Send(message);
                    }
                    catch (Exception ex)
                    {
                        return "NOEMAIL";
                    }

                    return "WITHEMAIL";
                }
                else
                {
                    return "REQURID";
                }

            }
            catch (Exception ex)
            {
                return "NOTINSERT";
            }
        }

        public string Update(int UserId)
        {
            try
            {
                string path = Server.MapPath("/Scripts/DataSource.json");
                // Read existing json data
                var jsonData = System.IO.File.ReadAllText(path);
                // De-serialize to object or create new list
                var employeeList = JsonConvert.DeserializeObject<List<Login>>(jsonData)
                                      ?? new List<Login>();
                foreach (Login login in employeeList)
                {
                    if (UserId == login.Userid)
                    {

                        //Login dataObject = new Login();
                        login.Userid = UserId;
                        login.Email = login.Email;
                        login.Password = login.Password;
                        login.Isactive = true;
                        JavaScriptSerializer serializer = new JavaScriptSerializer();
                        serializer.Serialize(login);

                    }
                }
                string output = Newtonsoft.Json.JsonConvert.SerializeObject(employeeList, Newtonsoft.Json.Formatting.Indented);
                System.IO.File.WriteAllText(path, output);

                return "Account activated successfully";
            }
            catch (Exception ex)
            {
                return "Issue to active account";
            }
        }

        [HttpPost]
        public string LogOut()
        {
            Session.Clear();
            Session.Abandon();
            return "You have successfully logged out!";
        }
    }
}
