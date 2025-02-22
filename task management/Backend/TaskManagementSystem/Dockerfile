# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven dependencies and build the JAR file
COPY target/DoctorAppointmentBookingSystem-0.0.1-SNAPSHOT.jar app.jar

# Expose port for Spring Boot
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
