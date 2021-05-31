---
title: Continuous Integration and Continuous Delivery
date: "2021-08-31T08:38:00.000Z"
---

Continuous integration (CI) and continuous delivery (CD) embody a culture ...

<!-- more -->

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--20EL7Pwn--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/adlbbaouajmsd5j26wd6.png" width="600px" />
  <br>
</h2>

## What is Continuous Integration?

Continuous integration (CI) is a software development practice in which developers merge their changes to the main branch many times per day. Each merge triggers an automated code build and test sequence, which ideally runs in less than 10 minutes. A successful CI build may lead to further stages of continuous delivery.

If a build fails, the CI system blocks it from progressing to further stages. The team receives a report and repairs the build quickly, typically within minutes.

All competitive technology companies today practice continuous integration. By working in small iterations, the software development process becomes predictable and reliable. Developers can iteratively build new features. Product managers can bring the right products to market, faster. Developers can fix bugs quickly and usually discover them before they even reach users.

Continuous integration requires all developers who work on a project to commit to it. Results need to be transparently available to all team members and build status reported to developers when they are changing the code. In case the main code branch fails to build or pass tests, an alert usually goes out to the entire development team who should take immediate action to get it back to a "green" state.

## Why do we need Continuous Integration?

In business, especially in new product development, usually we can't figure everything up front. Taking smaller steps helps us estimate more accurately and validate more frequently. A shorter feedback loop means having more iterations. And it’s the number of iterations, not the number of hours invested, that drives learning.

For software development teams, working in long feedback loops is risky, as it increases the likelihood of errors and the amount of work needed to integrate changes into a working version software.

Small, controlled changes are safe to happen often. And by automating all integration steps, developers avoid repetitive work and human error. Instead of having people decide when and how to run tests, a CI tool monitors the central code repository and runs all automated tests on every commit. Based on the total result of tests, it either accepts or rejects the code commit.

## Extension with Continuous Delivery

Once we automatically build and test our software, it gets easier to release it. Thus Continuous Integration is often extended with Continuous Delivery, a process in which code changes are also automatically prepared for a release (CI/CD).

In a fine-tuned CI/CD process, all code changes are being deployed to a staging environment, a production environment, or both after the CI stage has been completed.

Continuous delivery can be a fully automated workflow. In that case, it's usually referred to as Continuous Deployment. Or, it can be partially automated with manual steps at critical points. What's common in both scenarios is that developers always have a release artifact from the CI stage that has gone through a standardized test process and is ready to be deployed.

## What is Proper Continuous Integration?

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--WYzNiLls--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/3s0s0cq5k7cw3e08q451.jpg" width="600px" />
  <br>
</h2>

Continuous integration (CI) is confusing. As with all ideas, everybody does their own version of it in practice.

CI is a solution to the problems we face while writing, testing and delivering software to end users. Its core promise is reliability.

A prerequisite for continuous integration is having an automated test suite. This is not a light requirement. Learning to write automated tests and mastering test-driven development takes years of practice. And yet, in a growing app, the tests we’ve developed can become an impediment to our productivity.

### Are We Doing CI?

Let's take two development teams, both writing tests, as an example. The first one's CI build runs for about 3 minutes. The second team clocks at 45 minutes. They both use a CI server or a cloud-based CI service that runs tests on feature branches. They both release reliable software in predictable cycles. But are they both doing proper continuous integration?

Martin Fowler recently shared a description of an informal CI certification process performed by Jez Humble:

> He usually begins the certification process by asking his [conference] audience to raise their hands if they do Continuous Integration. Usually most of the audience raise their hands.
He then asks them to keep their hands up if everyone on their team commits and pushes to a shared mainline (usually shared master in git) at least daily.
Over half the hands go down.
He then asks them to keep their hands up if each such commit causes an automated build and test. Half the remaining hands are lowered.
Finally he asks if, when the build fails, it’s usually back to green within ten minutes.
With that last question only a few hands remain. Those are the people who pass his certification test.

### Software Development or a Sword Fight?

If a CI build takes long enough for us to have time to go practice
swordmanship while we wait, we approach our work defensively. We tend to keep branches on the local computer longer, and thus every developer's code is in a significantly different state. Merges are rarer, and they become big and risky events. Refactoring becomes hard to do on the scale that the system needs to stay healthy.

With a slow build, every "git push" sends us to Limbo. We either wait, or look for something else to do to avoid being completely idle. And if we context-switch to something else, we know that we'll need to switch back again when the build is finished. The catch is that every task switch in programming is hard and it sucks up our energy.

The point of continuous in continuous integration is speed. Speed drives high productivity: we want feedback as soon as possible. Fast feedback loops keep us in a state of flow, which is the source of our happiness at work.

So, it's helpful to establish criteria for what proper continuous integration really means and how it's done.

### The 10 Minutes Test

It's simple: does it take you less than 10 minutes from pushing new code to
getting results? If so, congratulations. Your team is equipped for high performance. If not, your workflow only has elements of a CI process, for lack of a better term. But, this slowness develops wrong habits and hurts the productivity of all developers in a team. This ultimately inhibits the performance of the company as a whole.

Nobody sets out to build an unproductive delivery pipeline. Yet, we're busy enough writing code until we feel like a boiling frog — we don't notice the change until we accept it as the way things just are. Of course our build takes long, we have over 10,000 lines of code!

### The Light at the End of the Tunnel

But, things don't have to be this way. Regardless of how big your test suite is, parallelizing tests can cut waiting time down to just a couple of minutes or less. A fast hosted CI service that allows you to easily parallelize tests and scale as much as you need can make a big difference. This is why for us at Semaphore, providing the fastest CI/CD performance is one of the core product principles. By parallelizing tests, you can reduce the time you spend deciding what to do while you wait, and keep your team in a state of flow.

## What is a CI/CD pipeline?

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--xdJibpr4--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/nt9xxyniw6xshq8cja7k.png" width="600px" />
  <br>
</h2>

A CI/CD pipeline helps you automate steps in your software delivery process, such as initiating code builds, running automated tests, and deploying to a staging or production environment. Automated pipelines remove manual errors, provide standardized development feedback loops and enable fast product iterations.

### Elements of a CI/CD pipeline

A CI/CD pipeline may sound like overhead but it really isn't. It's essentially a runnable specification of the steps that need to be performed in order to deliver a new version of a software product. In the absence of an automated pipeline, engineers would still need to perform these steps manually, and hence far less productively.

Most software releases go through a couple of typical stages:

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ibwnfbRD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/kpyfzflk1ftmyhqb60j1.png" width="600px" />
  <br>
</h2>

Failure in each stage typically triggers a notification—via email, Slack, etc.—to let the responsible developers know about the cause. Otherwise notifications are usually configured to be sent to the whole team after each successful deploy to production.

### Source stage

In most cases a pipeline run is triggered by a source code repository. A change in code triggers a notification to the CI/CD tool, which runs the corresponding pipeline. Other common triggers include automatically scheduled or user-initiated workflows, as well as results of other pipelines.

### Build stage

We combine the source code and its dependencies to build a runnable instance of our product that we can potentially ship to our end users. Programs written in languages such as Java, C/C++, or Go need to be compiled, whereas Ruby, Python and JavaScript programs work without this step.

Regardless of the language, cloud-native software is typically deployed with Docker, in which case this stage of the CI/CD pipeline builds the Docker containers.

Failure to pass the build stage is an indicator of a fundamental problem in the configuration of our project and it's best to address it immediately.

### Test stage

In this phase we run automated tests to validate the correctness of our code and the behavior of our product. The test stage acts as a safety net that prevents easily reproducible bugs from reaching the end users.

The responsibility of writing tests falls on the developers, and is best done while we write new code in the process of test- or behavior-driven development.

Depending on the size and complexity of the project, this phase can last from seconds to hours. Many large-scale projects run tests in multiple stages, starting with smoke tests that perform quick sanity checks to end-to-end integration tests that test the entire system from the user's point of view. A large test suite is typically parallelized to reduce run time.

Failure during the test stage exposes problems in code that developers didn't foresee when writing the code. It's essential for this stage to produce feedback to developers quickly, while the problem space is still fresh in their minds and they can maintain the state of flow.

### Deploy stages

Once we have a built a runnable instance of our code that has passed all predefined tests, we're ready to deploy it. There are usually multiple deploy environments, for example a "beta" or "staging" environment which is used internally by the product team, and a "production" environment for end users.

Teams that have embraced the Agile model of development—which is guided by tests and real-time monitoring—usually deploy work-in-progress manually to a staging environment for additional manual testing and review, and automatically deploy approved changes from the master branch to production.

### Examples of CI/CD pipelines

A pipeline can start very simple. Here's an example of a pipeline for a Go project which compiles the code, checks code style and runs automated tests in two parallel jobs:

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--jPP_qAKT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://x2eh426qj0n44vhb23fwroq1-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/golang-ci-pipeline.png" width="600px" />
  <br>
</h2>

The pipeline is implemented with Semaphore, a cloud-based CI/CD service.

Here's a more complex example of a pipeline that builds, tests and deploys a microservice to a Kubernetes cluster:

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ZZOHwThI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://x2eh426qj0n44vhb23fwroq1-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/pipeline-1024x393.png" width="600px" />
  <br>
</h2>

### Additional benefits of pipelines

Having a CI/CD pipeline has more positive effects than simply making what was previously done a little bit more efficient:

- Developers can stay focused on writing code and monitoring the behavior of the system in production.
- QA and product stakeholders have easy access to the latest, or any, version of the system.
- Product updates are not stressful.
- Logs of all code changes, test and deployments are available for inspection at any time.
- Rolling back to a previous version in the event of a problem is a routine push-button action.
- A fast feedback loop helps build an organizational culture of learning and responsibility.

## Prerequisites for doing Continuous Integration

The basic prerequisites for implementing continuous integration include:

- Automating builds;
- Automating testing;
- More frequent commits to a single source code repository, and
- Providing visibility of the process and real-time access to CI status to the team.

Teams that don't practice CI yet should take small steps, continuously improve, and iterate on code and process in a way that helps the organization grow.

On every step in the journey to full CI/CD, the development team's productivity will rise, as well as the velocity of the entire business.

## A typical development workflow

You can apply continuous integration in most software projects, including web applications, cloud-native microservices, mobile apps, system software, IoT / embedded systems and more.

For example, Semaphore integrates with GitHub, bringing CI/CD into the standard pull request-based development process.

Here's a typical continuous integration workflow that Semaphore users practice on a daily basis:

- A developer creates a new branch of code in GitHub, makes changes in the code, and commits them.
- When the developer pushes her work to GitHub, Semaphore builds the code and then runs the automated test suite.
- If Semaphore detects any errors in the CI pipeline (status: red), the developer gets a Slack notification or sees a message on her personal dashboard on Semaphore.
If the developer has opened a pull request, Semaphore also reports the CI status on the pull request page on GitHub.
- Otherwise, the user gets a notification that CI has passed (status green). Semaphore automatically initiates the next pipeline which deploys a new version of the application to a staging server. This allows QA or anyone else on the team to test the changes in a production-like environment.
- Once another developer has verified the changes in a peer review, the author can merge the new branch of code into the master branch.
- Semaphore runs one more build and test pipeline on the master branch, and when it passes it deploys a new version of the code to production. The team gets a notification about a new release via Slack.

## Continuous Integration best practices

Treat master build as if you're going to make a release at any time. Which implies some team-wide don'ts:

- Don't comment out failing tests. File an issue and fix them instead.
- Don't check-in on a broken build and never go home on a broken build.

Keep the build fast: up to 10 minutes. Going slower is good but doesn't enable a fast-enough feedback loop.

Parallelize tests. Start by splitting by type (eg. unit and integration), then adopt tools that can parallelize each.

Have all developers commit code to master at least 10 times per day. Avoid long-running feature branches which result in large merges. Build new features iteratively and use feature flags to hide work-in-progress from end users.

Wait for tests to pass before opening a pull request. Keep in mind that a pull request is by definition a call for another developer to review your code. Be mindful of their time.

Test in a clone of the production environment. For example, you can define your CI environment with a Docker image, and make the CI environment match production 100%. An alternative is to customize the CI environment so that bugs due to difference with production almost never happen.

Use CI to maintain your code. For example, run scheduled workflows to detect newer versions of your libraries and upgrade them.

Keep track of key metrics: total CI build time (including queue time, which your CI tool should maintain at zero) and how often your master is red.

## Resources:

[Source I](https://dev.to/markoa/continuous-integration-explained-59f9) - [Source II](https://dev.to/markoa/ci-cd-pipeline-a-gentle-introduction-2n8k) - [Source III](https://dev.to/markoa/what-is-proper-continuous-integration-585c)