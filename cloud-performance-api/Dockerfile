FROM grafana/k6:latest AS k6

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=k6 /usr/bin/k6 /usr/bin/k6

COPY target/*.jar app.jar
COPY performance-reports ./performance-reports
COPY performance-test.js ./performance-test.js

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
