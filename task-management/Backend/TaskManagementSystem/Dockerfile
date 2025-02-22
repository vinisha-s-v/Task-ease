











FROM openjdk:17-jdk-slim AS builder

# Set working directory

WORKDIR /app

# Copy project files

COPY . .

# Build the application using Maven

RUN ./mvnw clean package -DskipTests

# Use a new lightweight image for the final container

FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built JAR from the previous stage

COPY --from=builder /app/target/DoctorAppointmentBookingSystem-0.0.1-SNAPSHOT.jar app.jar

ENV SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}
ENV SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}
ENV SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}
ENV SPRING_JWT_SECRET=${SPRING_JWT_SECRET}

# Expose the application port

EXPOSE 8080

# Run the application

ENTRYPOINT ["java", "-jar", "app.jar"]

