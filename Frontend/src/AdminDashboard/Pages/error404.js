// https://codepen.io/leenalavanya/pen/RYqvgK
import "../styles/error404Style.css";

const  ErrorNotFound = (props) => {
    return (
        <>
        <div className="error-404-body"> 
            <h1 className="error-404-h1">403</h1>
            <div className= "error-404-div"><p className="error-404-P">  <span className="error-404-span">ERROR CODE</span>: "<i className="error-404-i">HTTP 403 Forbidden</i>"</p>
            <p className="error-404-P"> <span>ERROR DESCRIPTION</span>: "<i className="error-404-i">Access Denied. You Do Not Have The Permission To Access This Page On This Server</i>"</p>
            <p className="error-404-P"> <span>SOME PAGES ON THIS SERVER THAT YOU DO HAVE PERMISSION TO ACCESS</span>: [<a href="/">Application Login</a>, <a href="/dashboard/signin">Admin Login</a> ]</p>
            <p className="error-404-P"> <span>HAVE A NICE DAY From  ShareIT:-)</span></p>
            </div>
        
            
        </div>
 
        </>
    )
}

export default ErrorNotFound;