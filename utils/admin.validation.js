function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  export const createAdminValidator = (name, email, password, confirm_password) => {
    if (!name) return {"name": "Name field is required"};
    if (!email) return {"email": "Email field is required"};
    if (!validateEmail(email)) return {"email": "Invalid email entered"};
    if (!password) return {"password": "Password field is required"};
    if (password.length < 6) return {"password": "Password must at least 6 characters"};
    if (!confirm_password) return {"confirm_password": "Confirm Password field is required"};
    if (password !== confirm_password) return {"confirm_password": "Password doesn't match"}
  };

  