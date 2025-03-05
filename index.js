const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

try {
  const dev = core.getInput("dev");
  const kind = core.getInput("kind");
  const namespace = core.getInput("namespace");
  const resourceName = core.getInput("resourceName");
  const containerName = core.getInput("containerName");
  const image = core.getInput("image");
  const token = core.getInput("token");

  const requestObject = {
    kind: kind,
    namespace: namespace,
    resourceName: resourceName,
    containerName: containerName,
    image: image,
  };

  var url =
    "https://platform-api.mogenius.com/cluster/workload/admin/set-image";
  if (dev === "true") {
    url =
      "https://platform-api.dev.mogenius.com/cluster/workload/admin/set-image";
  }

  axios
    .post(url, requestObject, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(
        "🚀 Your ",
        kind,
        " image has successfully been updated to '",
        image,
        "'."
      );
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        var errMsg = "Your API token is invalid. It might have expired or the scope might be insufficient.";
        console.log(errMsg);
        core.setFailed(errMsg);
      } else if (err.response) {
        // Access the error message correctly
        const errorData = err.response.data;
        const errorMsg = JSON.stringify(errorData) || "Request failed without a specific error message.";
        core.setFailed(errorMsg);
        console.log(errorMsg);
      } else {
        // Handle errors without response (e.g., network issues)
        const errorMsg = "An error occurred during the request: " + err.message;
        core.setFailed(errorMsg);
        console.log(errorMsg);
      }
    });
} catch (error) {
  core.setFailed(JSON.stringify(error));
  console.log("General error: " + JSON.stringify(error));
}
