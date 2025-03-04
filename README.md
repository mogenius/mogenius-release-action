# mogenius-release-action

With a mogenius API token you can simply change the imageName of your kubernetes resource:

```
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

```
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
