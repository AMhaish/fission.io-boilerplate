# Fission.io Boilerplate
Boilerplate for serverless functions for Kubernetes based on fission.io.
Fission is a fast, open-source serverless framework for Kubernetes with a focus on developer productivity and high performance.
Please follow their documentation here to know more about it:
[https://docs.fission.io/docs/]()

## Runtime
Fission.io is using different types of environments to power up its functions. For each type, there is a runtime. I used here NodeJS runtime with small modifications by adding some useful libraries to that runtime.
I used Fission.io official runtime, but it's not available now on the internet according to their documentation. So I left a version of it here if anyone needed to modify that.
[https://docs.fission.io/docs/languages/nodejs/]()
I pushed that version to Docker Hub, so you can use it directly from there or you can build and push your image. You can find my Docker image on:
[https://hub.docker.com/repository/docker/amhaish/fission.io]()

Also inside the runtime folder, you will find two sh scripts, one to create the environment on your Kubernetes cluster and one to update that environment.

## Fission function code
I defined a Hello World function with some ready code blocks if you want to try. Under src usually, I am creating a folder for each group of functions serving the same business logic. Like maybe a CRUD functions for a specific entity as an example.
We have also four sh scripts:
- create.sh: For creating the functions inside the group
- update.sh: For updating the functions inside the group
- trigger.sh: For creating needed triggers to call the functions if triggers are needed
- routes.sh: For creating routes to call the functions if routes through ingress are needed

## Build pipeline
I created sh scripts to deploy the defined functions in one command either using triggers or using routes. Also, I created Azure DevOps build pipeline YAML file that will only publish the functions with sh files to an artifact so we can use that artifact in the release pipeline to execute the sh files and create the functions on a Kubernetes cluster.