import Parse from "parse";

if (typeof window !== "undefined" && !Parse.applicationId) {
  Parse.initialize(
    "lbs0uHQj7eMZI6RpeJtNqg9eox1LqL9mIj3V1X4m",
    "EMY4oNVsNgiSLtHdLBdJvFs5Em1P9q6Cp1nhbK55"
  );
  Parse.serverURL = "https://parseapi.back4app.com";
}

export default Parse;