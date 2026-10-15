FROM alpine:3.21

RUN addgroup -S nonroot && \
    adduser -S nonroot -G nonroot && \
    apk add --no-cache npm && \
    npm install --ignore-scripts -g keep-a-changelog@3.2.0 && \
    rm -rf /var/cache/apk/*

USER nonroot

ENTRYPOINT ["changelog"]
