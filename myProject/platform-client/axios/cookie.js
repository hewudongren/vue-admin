// const cookie = {
//     getCookie: function(name) {
//       var value = "; " + document.cookie;
//       var parts = value.split("; " + name + "=");
//       if (parts.length == 2) return parts.pop().split(";").shift();
//     },
//     setCookie: function(cname, cvalue, exdays, domain) {
//       let d = new Date();
//       exdays = exdays || 30;
//       domain = domain || window.location.host;
  
//       d.setTime(d.getTime() + (exdays*24*60*60*1000));
//       let expires = "expires="+d.toUTCString();
//       document.cookie = cname + "=" + cvalue + "; " + expires + ';domain=' + domain + ';path=/';
//     },
//     delCookie: function(name) {
//       this.setCookie(name, "", -1);
//     }
//   };
//   export default cookie;


  const cookie = {

    getAuth() {
  
      return this.getCookie('auth')
    },
  
    getLoginToken() {
  
      return this.getCookie('token')
    },
  
    getCookie(name) {
      let cookieString = "; " + document.cookie
      let parts = cookieString.split("; " + name + "=")
     
      if (parts.length == 2) {
        return parts.pop().split(";").shift()
      }
  
      return ''
    },
  
    setCookie(cname, cvalue, exdays) {
      let expires = ''
      let d = new Date()
  
      exdays = exdays || 1
  
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      expires = "expires=" + d.toUTCString()
      document.cookie = cname + "=" + cvalue + "; " + expires
    },
  
    delCookie(name) {
  
      this.setCookie(name, "", -1)
    }
  };
  
  export default cookie;
  
  