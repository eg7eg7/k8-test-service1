FROM alpine

RUN apk add -U ca-certificates

COPY static/ /static/

ENV PORT 8080

CMD ["/static/index.html"]
