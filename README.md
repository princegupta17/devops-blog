# DevOps Blog

This repository allows you to containerize a blog website using Docker, push the image to AWS Elastic Container Registry (ECR), and orchestrate it using AWS Elastic Kubernetes Service (EKS).

## Prerequisites

1. **Fork the IAC Blog Repository**:
   - Start by forking [iac-blog](https://github.com/princegupta17/iac-blog) into your own GitHub account.
   - Run the Terraform workflows from the `iac-blog` repository to provision the necessary AWS infrastructure, including the **VPC** and **EKS service**.

2. **AWS Setup**:
   - Make sure your AWS account is set up with VPC and EKS, following the successful execution of the Terraform commands from the `iac-blog` repository.

## Setup

### Step 1: Fork this Repository
Fork the `devops-blog` repository to your GitHub account after completing the AWS setup from the `iac-blog` repository.

### Step 2: Containerize the Blog Website
In this repository, you will:
- Use **Docker** to containerize the blog website.
- Push the Docker image to **AWS Elastic Container Registry (ECR)**.

### Step 3: Orchestration using EKS
Once the image is pushed to ECR, you can orchestrate the deployment using **AWS EKS**.

### Step 4: Start the Workflow
After forking this repository, start the GitHub Actions workflow to handle the orchestration of your containerized blog website.

## Conclusion
By following the above steps, you'll successfully deploy and orchestrate a blog website on AWS using ECR and EKS, with the entire process automated through GitHub Actions.
