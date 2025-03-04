const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');



try {
    // Fetch the value of the input 'who-to-greet' specified in action.yml
    const kind = core.getInput('kind');
    const namespace = core.getInput('namespace');
    const resourceName = core.getInput('resourceName');
    const containerName = core.getInput('containerName');
    const image = core.getInput('image');

    const token = core.getInput('token');


    const requestObject = {
        kind: kind,
        namespace: namespace,
        resourceName: resourceName,
        containerName: containerName,
        image: image
    }
    console.log(requestObject);
    
    axios.post('https://b43778e64664e322d0c3ac75741a2921.serveo.net/cluster/workload/admin/set-image', requestObject, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        core.setFailed(err);
    }
    );


} catch (error) {
    // Handle errors and indicate failure
    core.setFailed(error.message);
}
