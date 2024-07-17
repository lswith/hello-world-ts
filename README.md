# hello-world-js

This is a simple application for checking out features in datadog.

It has been setup with:

- graphql
- basic /hello endpoint
- a /error endpoint to view errors
- pino request logging
- datadog apm

## Running locally

To get datadog working locally, you will need to install the agent on your computer: https://docs.datadoghq.com/agent/basic_agent_usage/osx/

You will need to make sure the agent is configured with:

```
api_key: ...
site: us3.datadoghq.com
logs_enabled: true


```

You will also need to write a file to `/opt/datadog-agent/etc/conf.d/file.d/conf.yaml` which has:

```
#Log section
logs:
  - type: file
    path: <path to codebase>/hello-world-ts/logs/app.log
    service: hello-world
    source: file
```

You can then run `yarn dev` and start using the application.
