# Step 1: Build the application
FROM openjdk:17-jdk-slim AS builder
WORKDIR /app
COPY . .
 
# Fix: Set execute permission for mvnw
RUN chmod +x mvnw
 
# Run Maven build
RUN ./mvnw clean package -DskipTests
 
# Step 2: Run the application
FROM openjdk:17-jdk-slim
WORKDIR /app
 
# Copy built JAR file from builder stage
COPY --from=builder /app/target/DoctorAppointmentBookingSystem-0.0.1-SNAPSHOT.jar app.jar
 
# Define environment variables
ENV SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}
ENV SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}
ENV SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}
ENV SPRING_JWT_SECRET=${SPRING_JWT_SECRET}
 
# Expose the application's port
EXPOSE 8080
 
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]