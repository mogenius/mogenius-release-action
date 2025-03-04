# mogenius-release-action

With this action you can release a new version of your application to your kubernetes cluster using mogenius.

## Setp-by-step guide:
1. Create a API token in mogenius
2. Add the action to your workflow
3. Set the required inputs (keep in mind that the apitoken should be stored in the repository secrets)
4. Run your workflow to release a new version of your application

## Raw example
```yaml
- name: Release with mogenius
  uses: mogenius/mogenius-release-action@v1
  with:
    image: "ghcr.io/myorg/nginx:1.2.3"
    kind: Deployment
    namespace: default
    resourceName: web-app
    containerName: nginx
    token: ${{ secrets.MOGENIUS_TOKEN }}
```


## Example with env vars
```yaml
- name: Release with mogenius
  uses: mogenius/mogenius-release-action@v1
  with:
    image: "${{ env.IMAGE_NAME }}:${{ env.VERSION }}"
    kind: ${{ env.RESOURCE_TYPE }}
    namespace: ${{ env.NAMESPACE_NAME }}
    resourceName: ${{ env.RESOURCE_NAME }}
    containerName: ${{ env.CONTAINER_NAME }}
    token: ${{ secrets.MOGENIUS_TOKEN }}
```

## Curl Example
```bash
curl -X POST "https://platform-api.mogenius.com/cluster/workload/admin/set-image" \
-H "Authorization: Bearer YOUR_MOGENIUS_API_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "kind": "Deployment",
  "namespace": "default",
  "resourceName": "my-web-app",
  "containerName": "nginx",
  "image": "ghcr.io/myorg/nginx:1.2.3"
}'
```
