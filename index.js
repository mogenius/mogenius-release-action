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

  const url =
    "https://platform-api.dev.mogenius.com/cluster/workload/admin/set-image";
  if (dev === "true") {
    url = "https://platform-api.mogenius.com/cluster/workload/admin/set-image";
  }

  axios
    .post(url, requestObject, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
    .catch((err) => {
      core.setFailed(err);
    });
} catch (error) {
  // Handle errors and indicate failure
  core.setFailed(error.message);
}
