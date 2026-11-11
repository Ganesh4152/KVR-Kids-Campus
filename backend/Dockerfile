# =========================================================
# KVR Kids Campus - Backend Dockerfile
# Spring Boot 4.0.7 / Java 21
# =========================================================

# ---------------------------------------------------------
# STAGE 1: BUILD
# ---------------------------------------------------------
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy Maven wrapper and project configuration first.
# This improves Docker build cache usage.
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make Maven wrapper executable
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -DskipTests

# Copy application source
COPY src src

# Build Spring Boot application
RUN ./mvnw clean package -DskipTests


# ---------------------------------------------------------
# STAGE 2: RUNTIME
# ---------------------------------------------------------
FROM eclipse-temurin:21-jre

WORKDIR /app

# Install curl for Docker health checks
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Copy the generated Spring Boot JAR
COPY --from=build /app/target/*.jar app.jar

# KVR Spring Boot backend port
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
