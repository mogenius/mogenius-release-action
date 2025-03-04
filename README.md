# mogenius-release-action

With a mogenius API token you can simply change the imageName of your kubernetes resource:

```
- name: Release with mogenius
  uses: mogenius/mogenius-release-action@edb6c3024eafef28dc83f1e70f1c16e62a0e321f
  with:
    image: "ghcr.io/myorg/nginx:1.2.3"
    resourceType: Deployment
    namespace: default
    resourceName: web-app
    containerName: nginx
    token: ${{ secrets.MOGENIUS_TOKEN }}
```

```
- name: Release with mogenius
  uses: mogenius/mogenius-release-action@edb6c3024eafef28dc83f1e70f1c16e62a0e321f
  with:
    image: "${{ env.IMAGE_NAME }}:${{ env.VERSION }}"
    resourceType: ${{ env.RESOURCE_TYPE }}
    namespace: ${{ env.NAMESPACE_NAME }}
    resourceName: ${{ env.RESOURCE_NAME }}
    containerName: ${{ env.CONTAINER_NAME }}
    token: ${{ secrets.MOGENIUS_TOKEN }}
```
