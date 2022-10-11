# Andook's REST API OpenAPI Description

This repository contains [OpenAPI](https://www.openapis.org/) descriptions for Andook's REST API.

## What is OpenAPI?

From the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification):

> The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic. When properly defined via OpenAPI, a consumer can understand and interact with the remote service with a minimal amount of implementation logic. Similar to what interface descriptions have done for lower-level programming, the OpenAPI Specification removes guesswork in calling a service.

## Project Status

This project is **unstable** as we are rapidly iterating on our API's. Because we follow `semver` guidelines, any minor release `0.*.*` is considered a breaking change and will not break your code unless you specifically update to that version.

The `descriptions` folder contains the 3.0 version of the description.
The `descriptions-next` folder contains the 3.1 version of the description, and is subject to breaking changes on the `main` branch.

## Description Formats

Each OpenAPI document is available in two formats: **bundled** and **dereferenced**.

  - The bundled descriptions are single file artifacts that make usages of OpenAPI **components** for reuse and portability. This is the preferred way of interacting with Andook's OpenAPI description.
  - Certain tools have poor support for references to components within the artifact. We highly encourage to look into tooling that supports referenced components, but since that's not always possible, we also provide a fully dereferenced version of the description as well, without any references.

## Limitations

  - Response object definitions are missing non-functional headers, we will try to add those as soon as possible.

## Contributing

Because this description is used across Andook's whole API development experience, we don't currently accept pull requests that directly modify the description. This repository is automatically kept up to date with the description used to validate Andook API requests as well as powering contract tests. See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

If you've identified a mismatch between Andook API's behavior and these descriptions, or found an issue with the format of a schema, [please open an issue.](https://github.com/andook/rest-api-description/issues/new?template=schema-inaccuracy.md)

## License

andook/rest-api-description is licensed under the [MIT license](LICENSE.md)
