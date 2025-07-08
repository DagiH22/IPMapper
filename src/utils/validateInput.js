function isValidInput(input) {
    const ipv4Pattern = /^(25[0-5]|2[0-4]\d|1?\d{1,2})(\.(25[0-5]|2[0-4]\d|1?\d{1,2})){3}$/;
    const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
    if (ipv4Pattern.test(input)) {
        return 'ip';
      } else if (domainPattern.test(input)) {
        return 'domain';
      } else {
        return 'invalid';
      }
}
export default isValidInput
