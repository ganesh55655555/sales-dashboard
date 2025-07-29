# Use a minimal base image with JDK
FROM eclipse-temurin:17-jdk-jammy

# Set environment variables
ENV APP_HOME=/app
WORKDIR $APP_HOME

# Copy the built JAR file into the container
COPY target/salesbackend-0.0.1-SNAPSHOT.jar app.jar

# Expose the backend port
EXPOSE 9090

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
