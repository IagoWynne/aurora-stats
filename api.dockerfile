FROM golang:1.22.3 AS build-stage
WORKDIR /app
COPY ./api/go.mod ./api/go.sum ./
RUN go mod download
COPY ./api/. ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /aurora-stats-api

# FROM build-stage AS run-test-stage
# RUN go test -v ./...

FROM gcr.io/distroless/base-debian11 AS build-release-stage
WORKDIR /
COPY --from=build-stage /aurora-stats-api /aurora-stats-api
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/aurora-stats-api"]