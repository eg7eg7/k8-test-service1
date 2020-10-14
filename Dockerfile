FROM alpine

RUN apk add -U ca-certificates

COPY static/ /static/
COPY api-service1 /

ENV PORT 8080

CMD ["/api-service1"]
