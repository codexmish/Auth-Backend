// ---email razex
function isValidateEmail(email) {
  const emailRagex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRagex.test(email);
}

// ---password razex
function isValidatePassword(password) {
  const passwordRagex = /^.{6,}$/;
  return passwordRagex.test(password);
}

module.exports = { isValidateEmail, isValidatePassword };
