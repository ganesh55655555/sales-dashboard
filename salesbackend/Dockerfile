# salesbackend/Dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app
COPY target/salesbackend-0.0.1-SNAPSHOT.jar salesbackend-0.0.1-SNAPSHOT.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "salesbackend-0.0.1-SNAPSHOT.jar", "--server.port=9090"]
