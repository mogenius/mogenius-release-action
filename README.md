# mogenius-release-action

A GitHub Action to roll out a new container image to a Kubernetes workload managed by [mogenius](https://mogenius.com).

It calls the mogenius platform API and updates the `image` of a specific container in a workload (Deployment, StatefulSet, DaemonSet, etc.) — typically used as the final step of a CI pipeline after a new image has been built and pushed.

## Step-by-step guide

1. Create an API token in mogenius (workspace-scoped or cluster-scoped).
2. Store it as a repository secret, e.g. `MOGENIUS_TOKEN`.
3. Add the action to your workflow.
4. Set the required inputs (see below).
5. Run the workflow to release a new version.

## Inputs

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `token` | yes | — | mogenius API token. Store it as a repository secret. |
| `keyKind` | yes | `workspace` | Scope of the API token: `workspace` or `cluster`. |
| `kind` | yes | `Deployment` | Kubernetes resource kind: `Deployment`, `StatefulSet`, `DaemonSet`, `ReplicaSet`, `Job`, `CronJob`. |
| `namespace` | yes | — | Namespace the resource lives in. |
| `resourceName` | yes | — | Name of the workload to update. |
| `containerName` | yes | — | Name of the container inside the workload whose image should be replaced. |
| `image` | yes | — | New container image (including tag), e.g. `ghcr.io/myorg/nginx:1.2.3`. |
| `dev` | no | `false` | Use the mogenius dev API instead of production. |
| `debug` | no | `false` | Print the resolved API URL and request payload for debugging. |

## Basic example

```yaml
- name: Release with mogenius
  uses: mogenius/mogenius-release-action@v1
  with:
    image: "ghcr.io/myorg/nginx:1.2.3"
    kind: Deployment
    namespace: default
    resourceName: web-app
    containerName: nginx
    keyKind: workspace
    token: ${{ secrets.MOGENIUS_TOKEN }}
```

## Example with environment variables

```yaml
- name: Release with mogenius
  uses: mogenius/mogenius-release-action@v1
  with:
    image: "${{ env.IMAGE_NAME }}:${{ env.VERSION }}"
    kind: ${{ env.RESOURCE_TYPE }}
    namespace: ${{ env.NAMESPACE_NAME }}
    resourceName: ${{ env.RESOURCE_NAME }}
    containerName: ${{ env.CONTAINER_NAME }}
    keyKind: workspace
    token: ${{ secrets.MOGENIUS_TOKEN }}
```

## Equivalent curl call

The action is a thin wrapper around the mogenius platform API. The endpoint depends on `keyKind`:

- `workspace` → `POST /workspace/workload/set-image`
- `cluster` → `POST /cluster/workload/admin/set-image`

```bash
curl -X POST "https://platform-api.mogenius.com/workspace/workload/set-image" \
  -H "Authorization: YOUR_MOGENIUS_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "kind": "Deployment",
    "namespace": "default",
    "resourceName": "web-app",
    "containerName": "nginx",
    "image": "ghcr.io/myorg/nginx:1.2.3"
  }'
```
