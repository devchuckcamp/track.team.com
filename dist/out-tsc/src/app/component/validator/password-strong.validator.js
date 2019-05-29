var PasswordValidator = /** @class */ (function () {
    function PasswordValidator() {
    }
    PasswordValidator.strong = function (control) {
        var hasNumber = /\d/.test(control.value);
        var hasUpper = /[A-Z]/.test(control.value);
        var hasLower = /[a-z]/.test(control.value);
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        var valid = hasNumber && hasUpper && hasLower;
        if (!valid) {
            // return what´s not valid
            return { strong: true };
        }
        return null;
    };
    return PasswordValidator;
}());
export { PasswordValidator };
//# sourceMappingURL=password-strong.validator.js.map