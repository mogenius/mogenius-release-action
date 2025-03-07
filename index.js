const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

try {
  const dev = core.getInput("dev"); // true | false
  const keyKind = core.getInput("keyKind"); // cluster | workspace
  const kind = core.getInput("kind"); // Deployment | Statefulset | Daemonset | Job | Cronjob
  const namespace = core.getInput("namespace");
  const resourceName = core.getInput("resourceName");
  const containerName = core.getInput("containerName");
  const image = core.getInput("image");
  const token = core.getInput("token");

  const API_URL = dev === "true" ? "https://platform-api.dev.mogenius.com" : "https://platform-api.mogenius.com";
  const API_CLUSTER_URL = API_URL + "/cluster/workload/admin/set-image";
  const API_WORKSPACE_URL = API_URL + "/workspace/workload/set-image";
  const API_URL_COMPLETED = keyKind === "cluster" ? API_CLUSTER_URL : API_WORKSPACE_URL;

  const requestObject = {
    kind: kind,
    namespace: namespace,
    resourceName: resourceName,
    containerName: containerName,
    image: image,
  };

  axios
    .post(API_URL_COMPLETED, requestObject, {
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
