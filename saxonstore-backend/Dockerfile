# Build the application
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Install the dependencies and build the application 
RUN mvn clean package -DskipTests

# Create the final image
FROM openjdk:17-jdk

# Set the working directory for the final image
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/saxonstore-backend.jar ./saxonstore-backend.jar

# Expose port 8080
EXPOSE 8080

# Set the entry point to run the Spring Boot app
ENTRYPOINT ["java", "-jar", "saxonstore-backend.jar"]
