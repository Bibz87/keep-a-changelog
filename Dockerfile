ARG DENO_IMAGE_VERSION="alpine-2.2.1"

FROM denoland/deno:${DENO_IMAGE_VERSION}

WORKDIR /app
COPY . .
RUN deno compile --check --allow-read --allow-write --output keep-a-changelog bin.ts

VOLUME ["/app/data"]
ENTRYPOINT [ "/app/keep-a-changelog" ]
